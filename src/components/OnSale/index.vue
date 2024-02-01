<template>
    <div class=" container mx-auto px-6">
        <div class="mt-16">
            <h3 class="text-gray-600 text-2xl font-medium">Today's Offer</h3>
            <div class="flex items-center justify-between text-sm tracking-widest uppercase">
                <p class="text-black-500">{{ `${paginatedProducts.length} Items` }}</p>
                <div class="flex items-center">
                    <p class="text-black-500">Sort</p>
                    <select class="font-medium text-black-700 bg-transparent dark:text-black-500 focus:outline-none">
                        <option value="#">Recommended</option>
                        <option value="#">Size</option>
                        <option value="#">Price</option>
                    </select>
                </div>
            </div>
            <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">

                <div v-for="product in paginatedProducts" :key="product.product_id"
                    class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden relative">

                    <div class="flex items-end justify-end h-56 w-full bg-cover"
                        :style="{ backgroundImage: 'url(' + product.image_path + ')' }">
                        <button v-if="product.amountSaved > 0" class="save-button absolute top-0 right-0 bg-green-500 
            text-white p-2 duration-100 hover:bg-green-700 rounded-full">
                            SAVE<br />{{ formatCurrency(product.amountSaved) }}
                        </button>
                        <button @click="addToCartButton(product)"
                            class="p-2 rounded-full bg-red-600 text-white mx-5 -mb-4 hover:bg-red-500 focus:outline-none focus:bg-red-500">
                            <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
                                </path>
                            </svg>
                        </button>
                    </div>
                    <div class="px-5 py-3">
                        <h3 class="text-gray-700 uppercase">{{ product.product_name }}</h3>
                        <p class="text-gray-500 mt-2">
                            <span v-if="product.sale_price && product.sale_price > 0">
                                {{ formatCurrency(product.sale_price) }}
                            </span>
                            <span v-else>
                                {{ formatCurrency(product.price) }}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-center mt-30">
            <MainPagination :currentPage="currentPage" :totalPages="totalPages" @goToPage="goToPage">
            </MainPagination>
        </div>

    </div>
</template>
    
    
    
<script>
import axios from 'axios';
import MainPagination from './../MainPagination/index'

export default {
    name: 'OnOffer',
    data() {
        return {
            products: [],
            wishlist: [],
            currentPage: 1,
            productsPerPage: 12,
            totalProducts: 0,
            selectedProduct: null
        };
    },
    components: {
        MainPagination,
    },
    methods: {
        async fetchProducts(startIndex, endIndex) {
            try {
                const response = await axios.get('http://localhost:3000/api/products');
                const products = response.data || [];


                // Assuming products have a product_id field
                const sortedProducts = [...products].sort((a, b) => b.product_id - a.product_id);

                // Update this.products with the fetched and sorted products within the specified range
                this.products = sortedProducts.slice(startIndex, endIndex);
                this.totalProducts = sortedProducts.length;
                // Calculate amount saved for each product
                this.calculateAmountSavedForEachProduct();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        calculateAmountSavedForEachProduct() {
            this.products.forEach((product) => {
                const numericPrice = Number(product.price);
                const numericSalePrice = Number(product.sale_price);

                if (!isNaN(numericPrice) && !isNaN(numericSalePrice)) {
                    product.amountSaved = numericPrice - numericSalePrice;
                } else {
                    console.error('Invalid Price or Discounted Price for a product:', product);
                }
            });
        },
        addToCartButton(product) {

            this.selectedProduct = product;
            this.addToCart();
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
        goToPage(page) {

            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;

            }
        },


        formatCurrency(value) {
            const numericValue = parseFloat(value);
            return isNaN(numericValue) ? '-' : numericValue.toLocaleString('en-KE', { style: 'currency', currency: 'KES' });
        },

    },
    computed: {
        paginatedProducts() {
            const startIndex = (this.currentPage - 1) * this.productsPerPage;
            const endIndex = startIndex + this.productsPerPage;

            return (this.products || []).slice(startIndex, endIndex);
        },
        totalPages() {
            const totalPages = Math.ceil((this.totalProducts || 0) / this.productsPerPage);
            return totalPages > 0 ? totalPages : 1; // Ensure a minimum of 1 page
        },
        productsOnSale() {
            return this.products.filter((product) => product.price > product.sale_price && product.sale_price > 0);
        },

        allProducts() {

            const sortedProducts = [...this.products].sort((a, b) => b.product_id - a.product_id);


            return sortedProducts.slice(0, 8);
        },
    },
    mounted() {
        this.fetchProducts();

    },
};
</script>
  

<style scoped>
.save-button {

    background-color: #eb2222;
    color: #fff;
    padding: 0.5rem;
    font-weight: bold;
    text-align: center;
    font-size: x-small;
    border-radius: 80%;
    width: 50px;
    height: 50px;

}
</style>