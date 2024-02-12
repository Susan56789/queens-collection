<template>
    <div class="bg-gray-800 shadow-lg p-3">
        <div class="flex flex-col gap-4">
            <TransactionSummary :totalSummary="totalSummary" :previousWeekTotal="previousWeekTotal" />
            <TransactionList :transactions="transactions" @update-transaction-status="handleUpdateTransactionStatus" />
            <LatestCustomers :transactions="transactions" />

        </div>
    </div>
</template>

<script>
import TransactionSummary from '@/components/AdminDashboard/TransactionSummary'
import TransactionList from '@/components/AdminDashboard/TransactionList'
import LatestCustomers from './LatestCustomers.vue'

export default {
    name: 'OrdersPage',
    components: {
        TransactionSummary,

        TransactionList,
        LatestCustomers
    },
    data() {
        return {

            transactions: [],
            currentPage: 1,
            itemsPerPage: 20,
            previousWeekTotal: 0,
            currentWeekTotal: 0,
            percentageChange: 0

        };
    },
    async mounted() {
        await this.fetchTransactions();
        // Calculate previous and current week's total sales
        this.previousWeekTotal = await this.calculatePreviousWeekTotal();
        this.currentWeekTotal = await this.calculateCurrentWeekTotal();
        // Calculate percentage change
        this.calculatePercentageChange();
    },
    computed: {
        totalSummary() {
            // Ensure transactions is an array before filtering
            if (!Array.isArray(this.transactions)) {
                return { totalTransactions: 0, totalAmount: 0 };
            }

            // Filter transactions for the past week
            const pastWeekTransactions = this.transactions.filter(transaction => {
                const transactionDate = new Date(transaction.payment_date);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return transactionDate > weekAgo;
            });

            // Calculate total amount and number of transactions
            const totalAmount = pastWeekTransactions.reduce((total, transaction) => {
                return total + parseFloat(transaction.amount || 0);
            }, 0);

            return {
                totalTransactions: pastWeekTransactions.length,
                totalAmount: totalAmount.toFixed(2)
            };
        },
        paginatedTransactions() {
            // Paginate transactions based on currentPage and itemsPerPage
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.transactions.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.transactions.length / this.itemsPerPage);
        }
    },
    methods: {
        handleUpdateTransactionStatus({ index, newStatus }) {
            // Ensure that 'transactions' array is not empty and 'index' is within bounds
            if (index >= 0 && index < this.transactions.length) {
                // Update the 'status' property of the transaction at the specified index
                this.transactions[index].status = newStatus;
            }
        },
        paginateTransactions(page) {
            this.currentPage = page;
        },
        async fetchTransactions() {
            try {
                const response = await this.$axios.get('http://localhost:3000/api/transactions');

                this.transactions = response.data;

            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        },
        async calculatePreviousWeekTotal() {
            try {
                // Calculate the start and end dates of the previous week
                const today = new Date();
                const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
                const startOfWeek = new Date(endOfWeek.getFullYear(), endOfWeek.getMonth(), endOfWeek.getDate() - 7);

                // Format the start and end dates as needed (e.g., to ISO string for API request)
                const startDateString = startOfWeek.toISOString();
                const endDateString = endOfWeek.toISOString();

                // Fetch transactions data for the previous week from your API
                const response = await this.$axios.get(`http://localhost:3000/api/transactions/dates?start_date=${startDateString}&end_date=${endDateString}`);
                const transactions = response.data;

                // Filter transactions that occurred within the previous week
                const previousWeekTransactions = transactions.filter(transaction => {
                    const transactionDate = new Date(transaction.payment_date);
                    return transactionDate >= startOfWeek && transactionDate <= endOfWeek;
                });

                // Calculate the total sales amount for the previous week
                const previousWeekTotal = previousWeekTransactions.reduce((total, transaction) => {
                    return total + parseFloat(transaction.amount || 0);
                }, 0);

                return previousWeekTotal;
            } catch (error) {
                console.error('Error calculating previous week total:', error);
                return 0; // Return 0 in case of error
            }
        },
        async calculateCurrentWeekTotal() {
            try {
                // Calculate the start and end dates of the current week
                const today = new Date();
                const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
                const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay()));

                // Format the start and end dates as needed (e.g., to ISO string for API request)
                const startDateString = startOfWeek.toISOString();
                const endDateString = endOfWeek.toISOString();

                // Fetch transactions data for the current week from your API
                const response = await this.$axios.get(`http://localhost:3000/api/transactions/dates?start_date=${startDateString}&end_date=${endDateString}`);
                const transactions = response.data;

                // Filter transactions that occurred within the current week
                const currentWeekTransactions = transactions.filter(transaction => {
                    const transactionDate = new Date(transaction.payment_date);
                    return transactionDate >= startOfWeek && transactionDate <= endOfWeek;
                });

                // Calculate the total sales amount for the current week
                const currentWeekTotal = currentWeekTransactions.reduce((total, transaction) => {
                    return total + parseFloat(transaction.amount || 0);
                }, 0);

                return currentWeekTotal;
            } catch (error) {
                console.error('Error calculating current week total:', error);
                return 0; // Return 0 in case of error
            }
        },
        calculatePercentageChange() {
            // Calculate percentage change
            if (this.previousWeekTotal !== 0) {
                this.percentageChange = ((this.currentWeekTotal - this.previousWeekTotal) / this.previousWeekTotal) * 100;
            } else {
                this.percentageChange = 0;
            }
        }
    },

}
</script>