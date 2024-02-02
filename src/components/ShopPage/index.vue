<template>
    <section class="bg-white">
        <div class="container px-6 py-8 mx-auto">
            <div class="flex mx-2">
                <div class="space-y-3 lg:w-1/5 lg:px-2 lg:space-y-4">
                    <a v-for="category in categories" :key="category.category_id" :class="{
                        'text-red-600 dark:text-red-500': selectedCategory === category.category_id,
                    }" @click="selectCategory(category.category_id)" href="#"
                        class="block font-medium text-black-500 hover:underline">
                        {{ category.category_name }}
                    </a>
                </div>

                <div v-if="selectedCategory !== null && categoryProducts.length > 0" class="mt-6 lg:mt-0 lg:px-2 lg:w-4/5">
                    <div class="flex items-center justify-between text-sm tracking-widest uppercase">
                        <p class="text-black-500">{{ `${paginatedProducts.length} Items` }}</p>
                        <div class="flex items-center">
                            <p class="text-black-500">Sort</p>
                            <select
                                class="font-medium text-black-700 bg-transparent dark:text-black-500 focus:outline-none">
                                <option value="#">Recommended</option>
                                <option value="#">Size</option>
                                <option value="#">Price</option>
                            </select>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <div v-for="product in paginatedProducts" :key="product.product_id"
                            class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
                            <router-link :to="'/product/' + product.product_name">
                                <img class="object-cover w-full rounded-md h-72 xl:h-80" :src="product.image_path"
                                    :alt="product.product_name" />
                                <h4 class="mt-2 text-lg font-medium text-black-700 dark:text-black-200">
                                    {{ product.product_name }}
                                </h4>
                            </router-link>
                            <p class="text-red-500">
                                <span v-if="product.sale_price && product.sale_price > 0">
                                    {{ formatCurrency(product.sale_price) }}
                                </span>
                                <span v-else>
                                    {{ formatCurrency(product.price) }}
                                </span>
                            </p>

                            <button
                                class="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-black-800 rounded-md hover:bg-black-700 focus:outline-none focus:bg-black-700"
                                @click="addToCartButton(product)">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mx-1" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path
                                        d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                </svg>
                                <span class="mx-1">Add to cart</span>
                            </button>
                        </div>
                    </div>
                    <div class="flex justify-center mt-30">
                        <MainPagination :currentPage="currentPage" :totalPages="totalPages" @goToPage="goToPage">
                        </MainPagination>
                    </div>
                </div>
                <div v-else class="mt-6 lg:mt-0 lg:px-2 lg:w-4/5">
                    <p v-if="selectedCategory !== null">
                        No products available for the selected category.
                    </p>
                    <p v-else>Please select a category to view products.</p>
                </div>
            </div>
        </div>

    </section>
</template>
  
<script>
import axios from 'axios';
import MainPagination from './../MainPagination/index'

export default {
    name: 'ShopPage',
    data() {
        return {
            categories: [],
            selectedCategory: 1,
            categoryProducts: [],
            currentPage: 1,
            productsPerPage: 12,
            totalProducts: 0,
            selectedProduct: null
        };
    },
    components: {
        MainPagination,
    },
    mounted() {
        this.fetchCategories();

        if (this.categories.length > 0) {
            this.selectedCategory = this.categories[0].category_id;
            this.fetchCategoryProducts();
        }
    },

    methods: {
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
        async selectCategory(categoryId) {

            this.selectedCategory = categoryId;

            this.fetchCategoryProducts();
        },
        async fetchCategories() {
            try {
                const response = await axios.get('http://localhost:3000/api/categories');
                this.categories = response.data;
            } catch (error) {
                console.error('Error fetching categories', error);
            }
        },
        async fetchCategoryProducts() {

            try {
                const response = await axios.get(
                    `http://localhost:3000/api/productsByCategory?categoryId=${this.selectedCategory}`
                );
                this.categoryProducts = response.data;

                this.totalProducts = this.categoryProducts.length;
            } catch (error) {
                console.error('Error fetching products', error);
            }
        },
    },
    computed: {
        paginatedProducts() {
            const startIndex = (this.currentPage - 1) * this.productsPerPage;
            const endIndex = startIndex + this.productsPerPage;

            return (this.categoryProducts || []).slice(startIndex, endIndex);
        },
        totalPages() {
            const totalPages = Math.ceil((this.totalProducts || 0) / this.productsPerPage);
            return totalPages > 0 ? totalPages : 1; // Ensure a minimum of 1 page
        },
    },

};
</script>
  
<style scoped>
button {
    background-color: red;
    color: #fff;
}
</style>
  