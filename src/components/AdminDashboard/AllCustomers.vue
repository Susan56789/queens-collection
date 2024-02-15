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
        <div
            class="grid px-4 py-3 text-xs font-semibold tracking-wide 
            text-white-500 uppercase border-t dark:border-gray-700 bg-red-500 sm:grid-cols-9 dark:text-white-400 bg-red-800">
            <span class="flex items-center col-span-3"> Showing {{ pagedTransactions.length }} of {{ totalCustomers }}
            </span>
            <span class="col-span-2"></span>

            <!-- Pagination -->
            <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                <nav aria-label="Table navigation">
                    <ul class="inline-flex items-center">
                        <li>
                            <button @click="prevPage"
                                class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                                aria-label="Previous">
                                <svg aria-hidden="true" class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                    <path
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clip-rule="evenodd" fill-rule="evenodd"></path>
                                </svg>
                            </button>
                        </li>
                        <!-- Render dynamic pagination buttons -->
                        <li v-for="pageNumber in totalPages" :key="pageNumber">
                            <button @click="changePage(pageNumber)"
                                :class="['px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple', { 'text-white dark:text-gray-800 transition-colors duration-150 bg-blue-600 dark:bg-gray-100 border border-r-0 border-blue-600 dark:border-gray-100 rounded-md': pageNumber === currentPage }]"
                                aria-label="Go to Page {{ pageNumber }}">{{ pageNumber }}</button>
                        </li>
                        <li>
                            <button @click="nextPage"
                                class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                                aria-label="Next">
                                <svg class="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                                    <path
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" fill-rule="evenodd"></path>
                                </svg>
                            </button>
                        </li>
                    </ul>
                </nav>
            </span>

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
            totalPages: 0,
            totalCustomers: 0
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
                    this.totalCustomers = this.latestCustomers.length
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
        },
        changePage(pageNumber) {
            this.currentPage = pageNumber;
            this.fetchTransactions();
        },
    },
    mounted() {
        this.fetchTransactions();
    }
};
</script>
