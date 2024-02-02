<template>
    <div class="flex flex-col  justify-center h-screen">
        <div class="relative w-full flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl
             shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
            <div class="w-full md:w-1/3 bg-white grid place-items-center">
                <img :src="selectedProduct.image_path" :alt="selectedProduct.product_name" class="rounded-xl" />
            </div>
            <div class="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                <div class="flex justify-between item-center">
                    <p class="text-gray-500 font-medium hidden md:block">{{ categoryName }}</p>

                    <div class="">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-pink-500" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>

                </div>
                <h3 class="font-black text-gray-800 md:text-3xl text-xl">{{ selectedProduct.product_name }}</h3>
                <p class="md:text-lg text-gray-500 text-base">{{ selectedProduct.description }}</p>
                <p class="inline-flex items-center space-x-1 md:space-x-3">
                    <span v-if="selectedProduct.color">Color: {{ selectedProduct.color }}</span>
                    <span v-if="selectedProduct.product_size">Size(s): {{ selectedProduct.product_size }} </span>
                </p>
                <p class="text-xl font-black text-gray-800">
                    <span v-if="selectedProduct.sale_price && selectedProduct.sale_price > 0">
                        {{ formatCurrency(selectedProduct.sale_price) }}
                    </span>
                    <span v-else>
                        {{ formatCurrency(selectedProduct.price) }}
                    </span>
                    <button @click="addToCartButton(product)"
                        class="p-2 rounded-full bg-red-600 text-white mx-5 -mb-4 hover:bg-red-500 focus:outline-none focus:bg-red-500">
                        <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
                            </path>
                        </svg>
                    </button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'SingleProduct',
    data() {
        return {
            selectedProduct: {
                image_path: '',
                price: '',
                sale_price: '',
                product_name: '',
                color: '',
                product_size: '',
                description: '',
                category_id: '',

            },
            categories: [],
            categoryName: '',
        }
    },
    mounted() {
        this.fetchProductDetails();
        this.fetchCategories();
    },
    methods: {
        formatCurrency(value) {
            const numericValue = parseFloat(value);
            return isNaN(numericValue) ? '-' : numericValue.toLocaleString('en-KE', { style: 'currency', currency: 'KES' });
        },
        async fetchCategories() {
            try {
                const response = await axios.get('http://localhost:3000/api/categories');
                this.categories = response.data;

                // Assuming selectedProduct has a valid category_id property
                const selectedCategoryId = this.selectedProduct.category_id;

                // Find the category with the matching category_id
                const matchingCategory = this.categories.find(category => category.category_id === selectedCategoryId);

                if (matchingCategory) {
                    this.categoryName = matchingCategory.category_name;

                }

            } catch (error) {
                console.error('Error fetching categories', error);
            }
        },

        fetchProductDetails() {
            const product_Name = this.$route.params.name;

            if (!product_Name) {
                console.error('Product name is undefined or null.');
                return;
            }

            try {
                const productName = decodeURIComponent(product_Name);

                axios
                    .get(`http://localhost:3000/api/product/${productName}`)
                    .then((response) => {
                        this.selectedProduct = response.data[0];
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } catch (decodeError) {
                console.error('Error decoding product name:', decodeError);
            }
        },
        addToCartButton(product) {
            product = this.selectedProduct;
            this.addToCart(product);
        },
        async addToCart() {
            try {

                const product = this.selectedProduct;

                // Check if the product data is valid
                if (this.isValidProductData(product)) {
                    // Proceed with adding the product to the cart
                    await this.addToCartRequest(product);
                } else {
                    // Provide feedback to the user about the invalid product data
                    console.error('Invalid product data for cart:', product);
                    alert('Invalid product data. Please select a valid product.');
                }
            } catch (error) {
                console.error('Error during addToCart:', error);
                // Handle errors and provide feedback to the user
                alert('Error adding product to cart. Please try again.');
            }
        },
        isValidProductData(product) {
            return product && product.product_id && product.price && product.quantity;
        },

        async addToCartRequest(product) {
            try {
                const response = await axios.post('http://localhost:3000/api/addToCart', product);
                console.log(response.data);
                // Provide feedback to the user upon successful addition to the cart
                alert('Product added to cart successfully!');
            } catch (error) {
                console.error(error);
                // Handle errors and provide feedback to the user
                alert('Error adding product to cart. Please try again.');
                throw error; // Propagate the error to the calling function
            }
        },

    },
};
</script>