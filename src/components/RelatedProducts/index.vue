
<template>
    <div v-if="relatedProducts">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Related Products</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Loop through related products and display them -->
            <div v-for="relatedProduct in relatedProducts" :key="relatedProduct.product_id">
                <div class="bg-white rounded-lg overflow-hidden shadow-md">
                    <img :src="relatedProduct.image_path" :alt="relatedProduct.product_name"
                        class="w-full h-40 object-cover">
                    <div class="p-4">
                        <h3 class="text-gray-800 font-bold text-lg mb-2">{{ relatedProduct.product_name }}</h3>
                        <p class="text-gray-600">{{ relatedProduct.description }}</p>
                        <p class="text-xl font-bold text-gray-800 mt-2">
                            {{ formatCurrency(relatedProduct.price) }}
                        </p>
                        <button @click="addToCartButton(relatedProduct)"
                            class="mt-2 p-2 rounded-full bg-red-600 text-white hover:bg-red-500 focus:outline-none focus:bg-red-500">
                            <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'RelatedProducts',
    props: {
        // You can pass related products as a prop from the parent component
        relatedProducts: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        addToCartButton(product) {
            this.$emit('add-to-cart', product);
        },
        formatCurrency(value) {
            const numericValue = parseFloat(value);
            return isNaN(numericValue) ? '-' : numericValue.toLocaleString('en-KE', { style: 'currency', currency: 'KES' });
        },
    },
};
</script>
  
<style scoped>
/* Add your component-specific styles here */
</style>
  