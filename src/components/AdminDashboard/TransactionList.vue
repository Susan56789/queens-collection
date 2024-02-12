<template>
    <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
        <div class="mb-4 flex items-center justify-between">
            <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Latest Transactions</h3>
                <span class="text-base font-normal text-gray-500">This is a list of latest transactions</span>
            </div>
            <div class="flex-shrink-0">
                <a href="#" class="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2">View all</a>
            </div>
        </div>
        <div class="flex flex-col mt-8">
            <div class="overflow-x-auto rounded-lg">
                <div class="align-middle inline-block min-w-full">
                    <div class="shadow overflow-hidden sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Transaction</th>
                                    <th scope="col"
                                        class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date & Time</th>
                                    <th scope="col"
                                        class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount</th>
                                    <th scope="col"
                                        class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white">
                                <tr v-for="(transaction, index) in transactions" :key="index"
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
                                        <p v-if="transaction.status === 'pending'" class="pending">Pending</p>
                                        <p v-else-if="transaction.status === 'failed'" class="failed">Failed</p>
                                        <p v-else-if="transaction.status === 'completed'" class="completed">Completed</p>
                                        <p v-else class="unknown">Unknown</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'TransactionList',
    props: {
        transactions: Array
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`;
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
    color: blue;
}
</style>