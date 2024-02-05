<template>
    <div class="container flex flex-col mx-auto px-6 bg-white">
        <BreadCrumbs />
        <div class="flex bg-white rounded-md shadow-2xl p-5">
            <!-- Wishlist Items -->
            <div class="w-3/4">
                <h1 class="text-2xl mb-4">Wishlist</h1>
                <ul v-if="wishlistItems.length > 0" class="space-y-4">
                    <li v-for="(item, index) in wishlistItems" :key="index" class="flex items-center justify-between">
                        <div class="flex items-center">
                            <router-link :to="'/product/' + item.product_name">
                                <img :src="item.image_path" :alt="item.product_name" class="h-30 w-30 object-cover mr-4" />
                            </router-link>
                            <div>
                                <router-link :to="'/product/' + item.product_name">
                                    <p class="text-lg">{{ item.product_name }}</p>
                                </router-link>
                                <p class="text-lg">KES. {{ formatCurrency(item.sale_price || item.price) }}</p>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <button @click="addToCart(index)" class="text-blue-500 px-2 mr-2">Add to Cart</button>
                            <button @click="removeFromWishlist(index)" class="text-red-500 px-2">Remove</button>
                        </div>
                    </li>
                </ul>
                <p v-else class="text-gray-500">No items in the wishlist.</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import BreadCrumbs from '../BreadCrumbs.vue';

export default {
    name: 'WishList',
    data() {
        return {
            wishlistItems: [],
        };
    },
    components: {
        BreadCrumbs
    },
    methods: {
        formatCurrency(value) {
            const numericValue = parseFloat(value);
            return isNaN(numericValue) ? '-' : numericValue.toLocaleString('en-KE', { style: 'currency', currency: 'KES' });
        },
        fetchWishlistItems() {
            axios.get('http://localhost:3000/api/allWishlistItems')
                .then(response => {
                    this.wishlistItems = response.data;
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        addToCart(index) {

            if (index >= 0 && index < this.wishlistItems.length) {
                const product = this.wishlistItems[index];
                if (product && product.product_name && product.Price) {
                    axios.post('http://localhost:3000/api/addToCart', product)
                        .then(response => {
                            console.log('post successful');
                            return response;
                        })
                        .catch(error => {
                            console.error(error);
                        });
                } else {
                    console.error('Invalid product data for cart:', product);
                }
            } else {
                console.error('Invalid index for wishlist item:', index);
            }
        },
        removeFromWishlist(index) {
            // Check if the index is valid
            if (index >= 0 && index < this.wishlistItems.length) {
                const item = this.wishlistItems[index];

                // Check if the item is an object and has the product_id property
                if (item && typeof item === 'object' && 'product_id' in item) {
                    const itemId = item.wishlist_id;
                    axios.delete(`http://localhost:3000/api/removeFromWishlist/${itemId}`)
                        .then(response => {
                            console.log(response.data);

                            // Remove the item from the wishlistItems array
                            this.wishlistItems.splice(index, 1);
                        })
                        .catch(error => {
                            console.error(error);
                        });
                } else {
                    console.error('Invalid item or missing product_id:', item);
                }
            } else {
                console.error('Invalid index:', index);
            }
        },





    },
    created() {
        this.fetchWishlistItems();
    },

}
</script>