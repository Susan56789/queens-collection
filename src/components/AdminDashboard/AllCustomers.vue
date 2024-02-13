<template>
    <div class="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold leading-none text-gray-900">All Customers</h3>
        </div>
        <div v-if="pagedTransactions.length > 0" class="flow-root">
            <ul role="list" class="divide-y divide-gray-200">
                <li v-for="(customer, index) in pagedTransactions" :key="index" class="py-3 sm:py-4">
                    <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0">
                            <img class="h-8 w-8 rounded-full" src="/images/Logo.png" :alt="customer.customer_name">
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-900 truncate">{{ customer.customer_name }}</p>
                            <p class="text-sm text-gray-500 truncate">
                                <a :href="'mailto:' + customer.email" class="__cf_email__" v-html="customer.email"></a>
                            </p>
                        </div>
                        <div class="inline-flex items-center text-base font-semibold text-gray-900">
                            {{ formatCurrency(customer.totalSpent) }}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div v-else>
            <p class="text-gray-500">No customers available.</p>
        </div>
        <!-- Pagination Controls -->
        <div class="flex justify-center mt-4">
            <button @click="prevPage" :disabled="currentPage === 1"
                class="mr-2 px-4 py-2 bg-red-200 text-gray-600 rounded hover:bg-red-300 focus:outline-none focus:bg-red-300">Previous</button>
            <span class="px-4 py-2 text-gray-600">{{ currentPage }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages"
                class="px-4 py-2 bg-red-200 text-gray-600 rounded hover:bg-red-300 focus:outline-none focus:bg-red-300">Next</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AllCustomers',
    data() {
        return {
            loading: false,
            latestCustomers: [],
            currentPage: 1,
            pageSize: 50,
            totalPages: 0
        };
    },
    created() {
        this.fetchTransactions();
    },
    computed: {
        pagedTransactions() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.latestCustomers.slice(startIndex, endIndex);
        }
    },
    methods: {
        fetchTransactions() {
            this.loading = true;
            axios.get(`http://localhost:3000/api/transactions`)
                .then(response => {
                    // Sort transactions by payment_date in descending order
                    response.data.sort((a, b) => new Date(b.payment_date) - new Date(a.payment_date));

                    // Extract customer name, email, and amount from transactions
                    const latestCustomer = response.data.map(transaction => ({
                        customer_name: transaction.customer_name,
                        email: transaction.email,
                        totalSpent: parseFloat(transaction.amount)
                    }));
                    this.latestCustomers = latestCustomer;

                    this.totalPages = Math.ceil(this.latestCustomers.length / this.pageSize);

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
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.fetchTransactions();
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.fetchTransactions();
            }
        }
    },
    mounted() {
        this.fetchTransactions();
    }
};
</script>
