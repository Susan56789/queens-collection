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
                <!-- Pagination -->
                <div class="flex justify-center mt-4">
                    <button @click="prevPage" :disabled="currentPage === 1"
                        class="px-3 py-1 mx-1 rounded-md focus:outline-none">Previous</button>
                    <button v-for="pageNumber in pageCount" :key="pageNumber" @click="setCurrentPage(pageNumber)"
                        :class="{ 'bg-red-500 text-white': currentPage === pageNumber, 'bg-gray-200': currentPage !== pageNumber }"
                        class="px-3 py-1 mx-1 rounded-md focus:outline-none">
                        {{ pageNumber }}
                    </button>
                    <button @click="nextPage" :disabled="currentPage === pageCount"
                        class="px-3 py-1 mx-1 rounded-md focus:outline-none">Next</button>
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
            pageSize: 50
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
                    this.transactions = response.data;
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
        }
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
  