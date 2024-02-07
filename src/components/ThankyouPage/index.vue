<template>
    <div class="flex justify-center items-center h-screen bg-gray-200 text-gray-900">
        <div class="rounded-md relative w-full max-w-screen-md shadow-2xl p-3 bg-white">
            <div class="py-2">
                <div class="text-center text-xl font-bold">ORDER</div>
                <div class="text-center text-xs font-bold">The order details</div>
            </div>
            <div class="text-center text-xs font-bold mb-1">~~~~~~~~~~~~~~~~~~~~~~~~~~~~</div>
            <div class="text-xs pl-2">
                <div class="text-xs mb-1">Customer: {{ localData.user_name }}</div>
                <div class="text-xs mb-1">Telephone: {{ localData.phone }}</div>
                <div>Order Number: {{ orderID }}</div>
            </div>
            <div class="border-double border-t-4 border-b-4 border-l-0 border-r-0 border-gray-900 my-3">
                <div class="flex text-sm pt-1 px-1">
                    <span class="w-2/6">Name</span>
                    <span class="w-2/6 text-right">Price</span>
                    <span class="w-2/6 text-right">Quantity</span>
                </div>
                <main v-for="(item, index) in orderItems" :key="index">
                    <div class="border-dashed border-t border-b border-l-0 border-r-0 border-gray-900 mt-1 my-2 py-2 px-1">
                        <div class="flex justify-between text-sm">
                            <span class="w-2/6 truncate">{{ item.product_name }}</span>
                            <span class="w-2/6 text-right">{{ formatCurrency(item.price) }}</span>
                            <span class="w-2/6 text-right">{{ item.quantity }}</span>
                        </div>
                    </div>
                </main>
                <div class="text-xs">

                    <div>Date: {{ getCurrentTimestamp() }}</div>
                    <div class="col-start-2 row-start-2 ">

                        <a href="#">Track order</a>
                    </div>
                </div>

            </div>
            <div class="absolute bottom-0 right-0 p-2 mt-10">
                <button @click="printPage" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Print
                </button>
            </div>
        </div>
    </div>
</template>
  
<script>


export default {
    name: 'ThankyouPage',
    props: {
        orderId: {
            type: String

        },
        orderSummary: {
            type: Object

        }
    },
    data() {
        return {
            localData: {},
            orderItems: [],
            orderID: '',
            createdAt: '',
        };
    },
    created() {
        this.fetchOrderDetails();
    },
    methods: {
        fetchOrderDetails() {
            const orderDataJson = this.$route.query.orderSummary;
            this.localData = orderDataJson ? JSON.parse(decodeURIComponent(orderDataJson)) : {};
            const orderId = this.$route.query.orderId;
            this.orderID = orderId;
            if (this.localData && this.localData.items) {
                this.orderItems = this.localData.items;


            } else {
                console.log('No order summary received.');
            }
        },
        formatCurrency(value) {
            // Function to format currency
            return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(value);
        },
        getCurrentTimestamp() {
            const now = new Date();
            return now.toLocaleString();
        },
        printPage() {
            window.print();
        }
    }

};
</script>
  
<style scoped></style>
  