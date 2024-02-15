<template>
    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
        <div
            class=" bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
            <div
                class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                    </path>
                </svg>
            </div>
            <div class="text-right">
                <p class="text-sm">{{ customers }}</p>
                <p class="text-sm">Customers </p>
            </div>
        </div>
        <div
            class=" bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
            <div
                class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
            </div>
            <div class="text-right">
                <p class="text-sm">{{ orders }}</p>
                <p class="text-sm">Orders</p>
            </div>
        </div>
        <div
            class=" bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
            <div
                class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
            </div>
            <div class="text-right">
                <p class="text-sm">{{ formatCurrency(
                    totalAmount) }}</p>
                <p class="text-sm">Sales</p>
            </div>
        </div>
        <div
            class=" bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
            <div
                class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                    </path>
                </svg>
            </div>
            <div class="text-right">
                <p class="text-sm">{{ formatCurrency(failedSales) }}</p>
                <p class="text-sm">Failed/Refunds</p>
            </div>
        </div>
    </div>
    <!-- ./Statistics Cards -->
</template>

<script>
export default {
    name: 'StatisticsPage',
    data() {
        return {
            latestCustomers: [],
            loading: false,
            customers: 0,
            orders: 0,
            sales: 0,
            transactions: [],
            totalAmount: 0,
            failedSales: 0,

        }
    },
    created() {
        this.fetchUsers();
        this.fetchOrders();
        this.fetchTransactions();
    },
    methods: {
        fetchUsers() {
            this.loading = true;
            this.$axios.get(`http://localhost:3000/api/users`)
                .then(response => {


                    // Format response data with comma separators
                    this.customers = response.data.length.toLocaleString();

                    this.loading = false;
                })
                .catch(error => {
                    console.error('Error fetching transactions:', error);
                    this.loading = false;
                });
        },
        fetchOrders() {
            this.loading = true;
            this.$axios.get(`http://localhost:3000/api/orders`)
                .then(response => {
                    this.orders = response.data.length
                    this.loading = false;
                })
                .catch(error => {
                    console.error('Error fetching transactions:', error);
                    this.loading = false;
                });
        },
        fetchTransactions() {
            this.loading = true;
            this.$axios.get('http://localhost:3000/api/transactions')
                .then(response => {
                    this.transactions = response.data;
                    // Initialize total amount variables
                    let totalAmount = 0;
                    let failedSales = 0;

                    // Loop through each transaction
                    this.transactions.forEach(transaction => {
                        // Check if transaction has an amount property and it's a valid number
                        if (transaction.amount && !isNaN(transaction.amount)) {
                            // Check transaction status
                            if (transaction.status === 'failed') {
                                failedSales += parseFloat(transaction.amount);
                            } else {
                                totalAmount += parseFloat(transaction.amount);
                            }
                        }
                    });

                    // Assign calculated values to component variables
                    this.totalAmount = totalAmount;
                    this.failedSales = failedSales;

                    this.loading = false;
                })
                .catch(error => {
                    console.error('Error fetching transactions:', error);
                    this.loading = false;
                });
        },

        formatCurrency(value) {
            const numericValue = parseFloat(value);
            if (isNaN(numericValue) || numericValue === 0) {
                return 'KES 0.00'; // Return 'KES 0.00' when the value is not a valid number or is 0
            } else {
                return numericValue.toLocaleString('en-KE', { style: 'currency', currency: 'KES' });
            }
        },
    }
}
</script>