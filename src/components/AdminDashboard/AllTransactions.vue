<template>
    <div class="container mx-auto">
        <h1 class="text-2xl font-bold mt-8 mb-4">All Transactions</h1>
        <div v-if="loading" class="text-center mt-4">
            <p>Loading...</p>
        </div>
        <div v-else>
            <div v-if="pagedTransactions.length === 0" class="text-center mt-4">
                <p>No transactions found.</p>
            </div>
            <div v-else>
                <div class="overflow-x-auto rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                        <!-- Table Header -->
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Transaction
                                </th>
                                <th scope="col"
                                    class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date & Time
                                </th>
                                <th scope="col"
                                    class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th scope="col"
                                    class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <!-- Table Body -->
                        <tbody class="bg-white">
                            <tr v-for="(transaction, index) in pagedTransactions" :key="transaction.payment_id"
                                :class="{ 'bg-gray-50': index % 2 === 1 }">
                                <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                    Payment from <span class="font-semibold">{{ transaction.customer_name }}</span>
                                </td>
                                <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                    {{ formatDate(transaction.payment_date) }}
                                </td>
                                <td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                    {{ formatCurrency(transaction.amount) }}
                                </td>
                                <td class="p-4 whitespace-nowrap text-sm font-semibold">
                                    <p :class="getStatusClass(transaction.status)">{{ transaction.status }}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div
                    class="grid px-4 py-3 text-xs font-semibold tracking-wide 
            text-white-500 uppercase border-t dark:border-gray-700 bg-red-500 sm:grid-cols-9 dark:text-white-400 bg-red-800">
                    <span class="flex items-center col-span-3"> Showing {{ pagedTransactions.length }} of {{
                        totalTransactions
                    }}
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
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    name: 'AllTransactions',
    data() {
        return {
            transactions: [],
            loading: false,
            currentPage: 1,
            pageSize: 50,
            totalPages: 0,
            totalTransactions: 0
        };
    },
    created() {
        this.fetchTransactions();
    },
    computed: {
        pagedTransactions() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.transactions.slice(startIndex, endIndex);
        },
        pageCount() {
            return Math.ceil(this.transactions.length / this.pageSize);
        }
    },
    methods: {
        fetchTransactions() {
            this.loading = true;
            axios.get('http://localhost:3000/api/transactions')
                .then(response => {
                    // Sort transactions by payment_date in descending order
                    this.transactions = response.data.sort((a, b) => new Date(b.payment_date) - new Date(a.payment_date));

                    this.totalPages = Math.ceil(this.transactions.length / this.pageSize);
                    this.totalTransactions = this.transactions.length
                    this.loading = false;
                })
                .catch(error => {
                    console.error('Error fetching transactions:', error);
                    this.loading = false;
                });
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`;
        },
        formatCurrency(value) {
            const numericValue = parseFloat(value);
            if (isNaN(numericValue) || numericValue === 0) {
                return 'KES 0.00';
            } else {
                return numericValue.toLocaleString('en-KE', { style: 'currency', currency: 'KES' });
            }
        },
        getStatusClass(status) {
            switch (status) {
                case 'pending':
                    return 'pending';
                case 'failed':
                    return 'failed';
                case 'completed':
                    return 'completed';
                default:
                    return 'unknown';
            }
        },
        setCurrentPage(pageNumber) {
            this.currentPage = pageNumber;
        },
        nextPage() {
            if (this.currentPage < this.pageCount) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        changePage(pageNumber) {
            this.currentPage = pageNumber;
            this.fetchTransactions();
        },
    }
};
</script>
  

<style scoped>
.pending {
    color: chartreuse;
}

.failed {
    color: red;
}

.completed {
    color: green;
}

.unknown {
    color: red;
}
</style>
  