<template>
    <router-view></router-view>

    <main class="my-8">
        <div class="container mx-auto px-6">
            <div class="h-64 rounded-md overflow-hidden bg-cover bg-center"
                style="background-image: url('/images/whitesportsshoe.webp')">
                <div class="bg-gray-900 bg-opacity-50 flex items-center h-full">
                    <div class="px-10 max-w-xl">
                        <h2 class="text-2xl text-white font-semibold">Sport Shoes</h2>
                        <p class="mt-2 text-white">Stay cool and fresh during your workouts with our shoes' breathable
                            materials. Improved airflow ensures your feet stay dry, reducing the risk of discomfort and
                            blisters.</p>
                        <button
                            class="flex items-center mt-4 px-3 py-2 bg-red-600 text-white text-sm uppercase font-medium rounded hover:bg-red-500 focus:outline-none focus:bg-red-500">
                            <span>Shop Now</span>
                            <svg class="h-5 w-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="md:flex mt-8 md:-mx-4">
                <div class="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2"
                    style="background-image: url('/images/yellowbackpack.webp')">
                    <div class="bg-gray-900 bg-opacity-50 flex items-center h-full">
                        <div class="px-10 max-w-xl">
                            <h2 class="text-2xl text-white font-semibold">Back Pack</h2>
                            <p class="mt-2 text-white">Crafted from high-quality, durable materials, our backpacks are built
                                to withstand the rigors of daily use and the challenges of outdoor exploration. Reinforced
                                stitching and robust zippers ensure longevity.</p>
                            <button
                                class="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                                <span>Shop Now</span>
                                <svg class="h-5 w-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="w-full h-64 mt-8 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2"
                    style="background-image: url('/images/fashion.webp')">
                    <div class="bg-gray-900 bg-opacity-50 flex items-center h-full">
                        <div class="px-10 max-w-xl">
                            <h2 class="text-2xl text-white font-semibold">Fashion</h2>
                            <p class="mt-2 text-white">Stay ahead of the fashion curve with our trendsetting styles. We
                                meticulously curate our collection to bring you the latest in clothing, accessories, and
                                footwear, ensuring you're always a step ahead in the style game.</p>
                            <button
                                class="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                                <span>Shop Now</span>
                                <svg class="h-5 w-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-16">
                <h3 class="text-gray-600 text-2xl font-medium">New Arrivals</h3>
                <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                    <div v-for="product  in allProducts.slice(0, 8)" :key="product.product_id"
                        class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                        <div class="flex items-end justify-end h-56 w-full bg-cover"
                            :style="{ backgroundImage: 'url(' + product.image_path + ')' }">
                            <button
                                class="p-2 rounded-full bg-red-600 text-white mx-5 -mb-4 hover:bg-red-500 focus:outline-none focus:bg-red-500">
                                <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                        <div class="px-5 py-3">
                            <h3 class="text-gray-700 uppercase">{{ product.product_name }}</h3>
                            <span class="text-gray-500 mt-2">{{ formatNumber(product.price) }}</span>
                        </div>
                    </div>


                </div>
            </div>
            <div class="mt-16">
                <h3 class="text-gray-600 text-2xl font-medium">Today's Offer</h3>
                <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                    <div v-for="product  in productsOnSale.slice(0, 8)" :key="product.product_id"
                        class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden relative">
                        <div class="flex items-end justify-end h-56 w-full bg-cover"
                            :style="{ backgroundImage: 'url(' + product.image_path + ')' }">
                            <button v-if="product.amountSaved > 0" class="save-button absolute top-0 right-0 bg-green-500 
                text-white p-2 duration-100 hover:bg-green-700 rounded-full">
                                SAVE<br />{{ formatNumber(product.amountSaved) }}
                            </button>
                            <button
                                class="p-2 rounded-full bg-red-600 text-white mx-5 -mb-4 hover:bg-red-500 focus:outline-none focus:bg-red-500">
                                <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                        <div class="px-5 py-3">
                            <h3 class="text-gray-700 uppercase">{{ product.product_name }}</h3>
                            <span class="text-gray-500 mt-2">KES. {{ formatNumber(product.sale_price) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios';

export default {
    name: 'HomePage',
    data() {
        return {
            products: [],
            wishlist: [],
        };
    },
    methods: {
        async fetchProducts() {
            try {
                const response = await axios.get('http://localhost:3000/api/products');
                this.products = response.data || [];
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

        formatNumber(value) {
            return value.toLocaleString();
        },
    },
    computed: {
        productsOnSale() {
            return this.products.filter((product) => product.price > product.sale_price && product.sale_price > 0);
        },
        allProducts() {
            return this.products.filter((product) => product)
        }

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

    border-radius: 80%;

}
</style>