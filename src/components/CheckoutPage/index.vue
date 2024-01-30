<template>
    <div class="px-5">
        <div class="mb-2">
            <a href="#" class="focus:outline-none hover:underline text-gray-500 text-sm"><i
                    class="mdi mdi-arrow-left text-gray-400"></i>Back</a>
        </div>
        <div class="mb-2">
            <h1 class="text-3xl md:text-5xl font-bold text-gray-600">Checkout.</h1>
        </div>
        <div class="mb-5 text-gray-400">
            <a href="#" class="focus:outline-none hover:underline text-gray-500">Home</a> / <a href="#"
                class="focus:outline-none hover:underline text-gray-500">Cart</a> / <span
                class="text-gray-600">Checkout</span>
        </div>
    </div>
    <div class="w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800">
        <div v-if="localcartData && localcartData.length > 0" class="w-full">
            <div class="-mx-3 md:flex items-start">
                <div class="px-3 md:w-7/12 lg:pr-10">
                    <div class="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                        <div v-for="(product, index) in localcartData" :key="index" class="w-full flex items-center">
                            <div class="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
                                <img :src="product.image_path" :alt="product.product_name">
                            </div>
                            <div class="flex-grow pl-3">
                                <h6 class="font-semibold uppercase text-gray-600">{{ product.product_name }}</h6>
                                <p class="text-gray-400">x {{ product.quantity }}</p>
                            </div>
                            <div>
                                <span class="font-semibold text-gray-600 text-xl">{{ formatCurrency(product.price)
                                }}</span><span class="font-semibold text-gray-600 text-sm">.00</span>
                            </div>
                        </div>
                    </div>
                    <div class="mb-6 pb-6 border-b border-gray-200">
                        <div class="-mx-2 flex items-end justify-end">
                            <div class="flex-grow px-2 lg:max-w-xs">
                                <label class="text-gray-600 font-semibold text-sm mb-2 ml-1">Discount code</label>
                                <div>
                                    <input
                                        class="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-red-500 transition-colors"
                                        placeholder="XXXXXX" type="text" />
                                </div>
                            </div>
                            <div class="px-2">
                                <button
                                    class="block w-full max-w-xs mx-auto border border-transparent bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold">APPLY</button>
                            </div>
                        </div>
                    </div>
                    <div class="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                        <div class="w-full flex mb-3 items-center">
                            <div class="flex-grow">
                                <span class="text-gray-600">Subtotal</span>
                            </div>
                            <div class="pl-3">
                                <span class="font-semibold">{{ formatCurrency(cartTotal + shippingFee) }}</span>
                            </div>
                        </div>
                        <div class="w-full flex items-center">
                            <div class="flex-grow">
                                <span class="text-gray-600">16% VAT</span>
                            </div>
                            <div class="pl-3">
                                <span class="font-semibold">{{ formatCurrency(cartTotal - (cartTotal * 0.96)) }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                        <div class="w-full flex items-center">
                            <div class="flex-grow">
                                <span class="text-gray-600">Total</span>
                            </div>
                            <div class="pl-3">
                                <span class="font-semibold">{{ formatCurrency(cartTotal) }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="px-3">
                    <div
                        class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">

                        <form @submit.prevent="submitOrder" class="w-full items-center">
                            <div class="form-group mb-4">
                                <label for="name" class="block text-sm font-medium text-gray-700">Name:</label>
                                <input type="text" id="name" v-model="userData.name" required
                                    class="mt-1 p-2 w-full border rounded-md" />
                            </div>

                            <div class="form-group mb-4">
                                <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
                                <input type="email" id="email" v-model="userData.email" required
                                    class="mt-1 p-2 w-full border rounded-md" />
                            </div>

                            <!-- Add more fields as needed (address, phone, location) -->
                            <div class="form-group mb-4">
                                <label for="address" class="block text-sm font-medium text-gray-700">Address:</label>
                                <input type="text" id="address" v-model="userData.address"
                                    class="mt-1 p-2 w-full border rounded-md" />
                            </div>

                            <div class="form-group mb-4">
                                <label for="phone" class="block text-sm font-medium text-gray-700">Phone:</label>
                                <input type="text" id="phone" v-model="userData.phone"
                                    class="mt-1 p-2 w-full border rounded-md" />
                            </div>

                            <div class="form-group mb-4">
                                <label for="location" class="block text-sm font-medium text-gray-700">Location:</label>
                                <input type="text" id="location" v-model="userData.location"
                                    class="mt-1 p-2 w-full border rounded-md" />
                            </div>
                        </form>
                    </div>
                    <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
                        <div class="w-full p-3 border-b border-gray-200">
                            <div class="mb-5">
                                <label for="type1" class="flex items-center cursor-pointer">
                                    <input type="radio" class="form-radio h-5 w-5 text-red-500" name="type" id="type1"
                                        checked>
                                    <img src="https://iconape.com/wp-content/files/xn/364965/svg/mpesa-seeklogo.com.svg"
                                        class="h-6 ml-3">
                                </label>
                            </div>
                            <div>
                                <div class="mb-3">

                                    <form @submit.prevent="makePayment">
                                        <label for="phone">Phone:</label>
                                        <input v-model="phone" type="tel" id="phone" placeholder="07xx xxx xxx" required
                                            class="border p-2 mb-4"><br />
                                        <label for="amount">Amount:</label>
                                        <input v-model="amount" type="number" id="amount" required class="border p-2 mb-4">
                                        <button @click="makePayment" type="submit"
                                            class="bg-red-500 text-white p-2 rounded">Pay Now</button>
                                    </form>
                                </div>


                            </div>
                        </div>

                    </div>
                    <div>
                        <button @click="confirmpayment" class="block w-full max-w-xs mx-auto bg-red-500 hover:bg-red-700
                             focus:bg-red-700 text-white rounded-lg px-3 py-2 font-semibold"><i
                                class="mdi mdi-lock-outline mr-1"></i> Complete Order</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <!-- Show a message or redirect if the cart is empty -->
            <p>Your cart is empty. <router-link to="/shop">Continue Shopping</router-link></p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CheckoutPage',
    props: {
        cartData: {
            type: Array,
            default: () => [],

        },

    },
    data() {
        return {
            localcartData: [],
            userData: {
                name: '',
                email: '',
                address: '',
                phone: '',
                location: '',
            },
            orderSubmitted: false,
            phone: '',
            amount: 0,
        };
    },
    created() {
        const cartDataJson = this.$route.query.cartData;
        this.localcartData = cartDataJson ? JSON.parse(cartDataJson) : [];
        console.log("Received cartItems:", this.localcartData);
    },

    computed: {

        shippingFee() {

            return 300;
        },

        cartTotal() {
            if (!this.localcartData) {
                return 0; // or handle this case appropriately
            }

            return this.localcartData.reduce((total, item) => {
                return total + (item.quantity * (item.sale_price || item.price));
            }, 0);
        },
    },
    methods: {
        formatCurrency(value) {
            if (typeof value === 'number') {
                // If the value is already a number, directly format it
                return value.toLocaleString('en-KE', { style: 'currency', currency: 'KES' });
            } else if (typeof value === 'string') {
                // Attempt to parse the value as a float and format it
                const numericValue = parseFloat(value);
                return isNaN(numericValue) ? '-' : numericValue.toLocaleString('en-KE', { style: 'currency', currency: 'KES' });
            } else {
                // Handle other cases or return a default value
                return '-';
            }
        },
        makePayment() {
            // Validate the phone number (you may need a more robust validation)
            const phoneRegex = /^07\d{8}$/;
            if (!phoneRegex.test(this.phone)) {
                alert('Please enter a valid phone number');
                return;
            }

            // Call your backend to initiate MPesa payment
            // You'll need to implement this part on your server
            // For example, using axios to send a request to your server endpoint
            // axios.post('/api/mpesa/payment', { phone: this.phone, amount: this.amount })
            //   .then(response => {
            //     console.log(response.data);
            //   })
            //   .catch(error => {
            //     console.error(error);
            //   });
        },

    }
}
</script>
<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css') .form-radio {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
    display: inline-block;
    vertical-align: middle;
    background-origin: border-box;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    flex-shrink: 0;
    border-radius: 100%;
    border-width: 2px;
}

.form-radio:checked {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
    border-color: transparent;
    background-color: currentColor;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
}

@media not print {
    .form-radio::-ms-check {
        border-width: 1px;
        color: transparent;
        background: inherit;
        border-color: inherit;
        border-radius: inherit;
    }
}

.form-radio:focus {
    outline: none;
}

.form-select {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a0aec0'%3e%3cpath d='M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z'/%3e%3c/svg%3e");
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
    background-repeat: no-repeat;
    padding-top: 0.5rem;
    padding-right: 2.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    background-position: right 0.5rem center;
    background-size: 1.5em 1.5em;
}

.form-select::-ms-expand {
    color: #a0aec0;
    border: none;
}

@media not print {
    .form-select::-ms-expand {
        display: none;
    }
}

@media print and (-ms-high-contrast: active),
print and (-ms-high-contrast: none) {
    .form-select {
        padding-right: 0.75rem;
    }
}
</style>