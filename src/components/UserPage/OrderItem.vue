<template>
    <div class="container mx-auto px-6">
        <div v-if="loading" class="mt-16">Loading...</div>
        <div v-else>
            <div v-if="error" class="mt-16 text-red-500">{{ error }}</div>
            <div v-else-if="products.length > 0" class="mt-16">
                <h3 class="text-gray-600 text-2xl font-medium">ITEMS FOR ORDER #{{ orderId }}</h3>
                <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                    <div v-for="product in products" :key="product.product_id"
                        class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                        <div class="flex items-end justify-end h-56 w-full bg-cover"
                            :style="{ backgroundImage: 'url(' + product.image_path + ')' }">
                            <button @click="addToCartButton(product)"
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
                            <router-link :to="'/product/' + product.product_name">
                                <h3 class="text-gray-700 uppercase">{{ product.product_name }}</h3>
                            </router-link>
                            <p class="text-gray-500 mt-2">
                                <span v-if="product.sale_price && product.sale_price > 0">{{
                                    formatCurrency(product.sale_price) }}</span>
                                <span v-else>{{ formatCurrency(product.price) }}</span>
                            </p>
                        </div>
                        <div class="px-5 py-3">Quantity:{{ quantity }}</div>
                    </div>

                </div>
            </div>
            <div v-else class="mt-16">No products available</div>
        </div>
    </div>
</template>
  
<script>


export default {
    data() {
        return {
            loading: true,
            error: null,
            products: [],
            orderId: 0,
            quantity: 0

        };
    },
    created() {
        this.fetchOrderItems();
    },
    methods: {
        async fetchOrderItems() {
            try {
                this.orderId = this.$route.params.orderId;
                const response = await fetch(`http://localhost:3000/api/orders/${this.orderId}/items`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch order items: ${response.statusText}`);
                }
                const data = await response.json();
                this.orderItems = data;


                // Fetch products for each order item
                for (const item of this.orderItems) {
                    const productId = item.product_id
                    const productResponse = await fetch(`http://localhost:3000/api/products/${productId}`);
                    if (!productResponse.ok) {
                        throw new Error(`Failed to fetch product ${productId}: ${productResponse.statusText}`);
                    }
                    const productData = await productResponse.json();
                    this.products.push(productData);
                    this.quantity = item.quantity
                }


                this.orderItems.forEach((item => {
                    return item.quantity

                }))
            } catch (error) {
                console.error('Error fetching data:', error);
                this.error = 'Failed to fetch data. Please try again later.';
            } finally {
                this.loading = false;
            }
        },
        addToCartButton(product) {
            // Implement addToCart logic here
            console.log('Adding to cart:', product);
        },
        formatCurrency(value) {
            const numericValue = parseFloat(value);
            return isNaN(numericValue) ? '-' : numericValue.toLocaleString('en-KE', { style: 'currency', currency: 'KES' });
        },
    }
};
</script>
  
<style>
/* Add your styles here */
</style>
  