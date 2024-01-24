<template>
    <div class="min-h-screen " v-if="cartData && cartData.length > 0">

        <div class="flex flex-col md:flex-row w-screen h-full px-14 py-7">

            <!-- My Cart -->
            <div class="w-full flex flex-col h-fit gap-4 p-4 ">
                <p class="text-red-900 text-xl font-extrabold">My cart</p>

                <!-- Product -->
                <div v-for="(product, index) in cartData" :key="index"
                    class="flex flex-col p-4 text-lg font-semibold shadow-md border rounded-sm">
                    <div class="flex flex-col md:flex-row gap-3 justify-between">
                        <!-- Product Information -->
                        <div class="flex flex-row gap-6 items-center">
                            <div class="w-28 h-28">
                                <img class="w-full h-full" :src="product.image_path" :alt="product.product_name" />
                            </div>
                            <div class="flex flex-col gap-1">
                                <p class="text-lg text-gray-800 font-semibold">{{ product.product_name }}</p>

                            </div>
                        </div>
                        <!-- Price Information -->
                        <div class="self-center text-center">
                            <div v-if="product.sale_price">
                                <p class="text-gray-600 font-normal text-sm line-through">
                                    {{ formatCurrency(product.price) }}

                                </p>
                                <span class="text-emerald-500 ml-2">
                                    (-{{ ((product.price - product.sale_price) / product.price * 100).toFixed(0) }}% OFF)
                                </span>
                            </div>
                            <!-- Always show the discounted price -->
                            <p class="text-gray-800 font-normal text-xl">{{ formatCurrency(product.sale_price ?
                                product.sale_price :
                                product.price) }}</p>
                        </div>
                        <!-- Remove Product Icon -->
                        <div class="self-center">
                            <button @click="removeItem(index)" class="">
                                <svg class="" height="24px" width="24px" id="Layer_1"
                                    style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512"
                                    xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <g>
                                        <path
                                            d="M400,113.3h-80v-20c0-16.2-13.1-29.3-29.3-29.3h-69.5C205.1,64,192,77.1,192,93.3v20h-80V128h21.1l23.6,290.7   c0,16.2,13.1,29.3,29.3,29.3h141c16.2,0,29.3-13.1,29.3-29.3L379.6,128H400V113.3z M206.6,93.3c0-8.1,6.6-14.7,14.6-14.7h69.5   c8.1,0,14.6,6.6,14.6,14.7v20h-98.7V93.3z M341.6,417.9l0,0.4v0.4c0,8.1-6.6,14.7-14.6,14.7H186c-8.1,0-14.6-6.6-14.6-14.7v-0.4   l0-0.4L147.7,128h217.2L341.6,417.9z" />
                                        <g>
                                            <rect height="241" width="14" x="249" y="160" />
                                            <polygon points="320,160 305.4,160 294.7,401 309.3,401" />
                                            <polygon points="206.5,160 192,160 202.7,401 217.3,401" />
                                        </g>
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <!-- Product Quantity -->
                    <div class="flex flex-row self-center gap-1">
                        <button @click="decreaseQuantity(index)"
                            class="w-5 h-5 self-center rounded-full border border-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#d1d5db"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14" />
                            </svg>
                        </button>
                        <span type="text"
                            class="w-8 h-8 text-center text-gray-900 text-sm outline-none border border-gray-300 rounded-sm">
                            {{
                                product.quantity }}
                        </span>
                        <button @click="increaseQuantity(index)"
                            class="w-5 h-5 self-center rounded-full border border-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="" stroke="#9ca3af"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                        </button>
                    </div>

                </div>
                <button @click="updateCart" :class="{
                    'transition-colors text-sm bg-white border border-gray-600 p-2 rounded-sm w-full text-gray-700 text-hover shadow-md':
                        isQuantityChanged,
                    'opacity-50 cursor-not-allowed': !isQuantityChanged
                }">
                    UPDATE CART
                </button>
            </div>


            <!-- Purchase Resume -->
            <div class="flex flex-col w-full md:w-2/3 h-fit gap-4 p-4">
                <p class="text-red-900 text-xl font-extrabold">Cart Summary</p>
                <div class="flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border rounded-sm">
                    <div class="flex flex-row justify-between">
                        <p class="text-gray-600">Subtotal ({{ cartData.length }} Items)</p>
                        <p class="text-end font-bold">{{ formatCurrency(cartTotalWithoutShipping) }}</p>
                    </div>
                    <hr class="bg-gray-200 h-0.5">
                    <div class="flex flex-row justify-between">
                        <p class="text-gray-600">Shipping Fee</p>
                        <div>
                            <p class="text-end font-bold">{{ formatCurrency(shippingFee) }}</p>
                            <p class="text-gray-600 text-sm font-normal">Arrives on {{ calculateDeliveryDate() }}</p>
                        </div>
                    </div>
                    <hr class="bg-gray-200 h-0.5">
                    <div class="flex flex-row justify-between">
                        <p class="text-gray-600">Discount Coupon</p>
                        <a class="text-gray-500 text-base underline" href="#">Add</a>
                    </div>
                    <hr class="bg-gray-200 h-0.5">
                    <div class="flex flex-row justify-between">
                        <p class="text-gray-600">Total</p>
                        <div>
                            <p class="text-end font-bold">{{ formatCurrency(calculatedTotal) }}</p>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <button @click="checkout"
                            class="transition-colors text-sm bg-red-600 hover:bg-red-700 p-2 rounded-sm w-full text-white text-hover shadow-md">
                            CHECKOUT
                        </button>
                        <button @click="returnshop"
                            class="transition-colors text-sm bg-white border border-gray-600 p-2 rounded-sm w-full text-gray-700 text-hover shadow-md">
                            CONTINUE SHOPPING
                        </button>
                    </div>
                </div>
            </div>
        </div>


    </div>
    <div v-else class="text-gray-600 min-h-screen ">
        <div class="grid grid-cols-3 grid-rows-3 place-items-center h-screen">
            <div class="col-start-2 row-start-2 ">
                <img src="/images/emptycart.png" />
                <p>Your cart is empty.</p>
                <a class="transition-colors text-sm bg-red-600 hover:bg-red-700 p-2 rounded-sm w-full text-white text-hover shadow-md"
                    href="/shop">Continue Shopping</a>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'CartPage',
    data() {
        return {
            cartData: [],
            shippingFee: 300,
            originalQuantities: []

        };
    },
    mounted() {
        this.fetchCartData();
    },
    computed: {

        cartTotalWithoutShipping() {
            if (!this.cartData) {
                return 0;
            }

            // Calculate the total without shipping by summing up the prices of all items in the cart
            return this.cartData.reduce((sum, item) => {
                if (item.sale_price > 0) {

                    return sum + (item.quantity * (item.sale_price));

                }
                return sum + (item.quantity * (item.price));

            }, 0);
        },
        calculatedTotal() {
            return this.cartTotalWithoutShipping + this.shippingFee;
        },
    },
    methods: {
        calculateDeliveryDate() {
            const currentDate = new Date();
            const deliveryDate = new Date(currentDate.setDate(currentDate.getDate() + 3));

            // Format the date to your desired format (e.g., "MMM DD")
            const options = { month: 'short', day: 'numeric' };
            return deliveryDate.toLocaleDateString('en-US', options);
        },
        formatCurrency(value) {
            const numericValue = parseFloat(value);
            return isNaN(numericValue) ? '-' : numericValue.toLocaleString('en-KE', { style: 'currency', currency: 'KES' });
        },
        async fetchCartData() {
            try {
                const response = await axios.get('http://localhost:3000/api/allCartItems');
                this.cartData = response.data;
                return this.cartData;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        isValidNumber(value) {
            return typeof value === 'number' && !isNaN(value) && isFinite(value);
        },
        increaseQuantity(index) {
            if (this.isValidIndex(index)) {
                const product = this.cartData[index];
                product.quantity++;


            } else {
                console.error('Invalid index.');
            }
        },

        decreaseQuantity(index) {
            if (this.isValidIndex(index)) {
                const product = this.cartData[index];

                if (product.quantity > 1) {
                    product.quantity--;


                } else {
                    console.error('Minimum quantity reached.');
                }
            } else {
                console.error('Invalid index.');
            }
        },

        removeItem(index) {
            const itemId = this.cartData[index].product_id;


            axios.delete(`http://localhost:3000/api/removeCartItem/${itemId}`)
                .then(response => {
                    console.log(response.data);


                    this.cartData.splice(index, 1);
                })
                .catch(error => {
                    console.error(error);
                });
        },

        isValidIndex(index) {
            return this.cartData && index >= 0 && index < this.cartData.length;
        },

        isQuantityChanged(index) {
            return this.cartData[index].quantity !== this.originalQuantities[index];
        },
        async updateCart() {
            try {
                const response = await axios.post('http://localhost:3000/api/update-cart', {
                    cartData: this.cartData,
                });

                console.log('Quantity updated in the database:', response.data);
            } catch (error) {
                console.error('An error occurred while updating the cart:', error.message);
            }
        }

    },









}






</script>