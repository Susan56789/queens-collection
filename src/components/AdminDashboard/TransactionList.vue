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
                                    <th scope="col"
                                        class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    </th>
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
                                        <p :class="getStatusClass(transaction.status)">{{ transaction.status }}</p>
                                    </td>
                                    <td class="p-4 whitespace-nowrap text-sm font-semibold edit">
                                        <button @click="openModal(transaction)" class="relative flex flex-row items-center h-11 focus:outline-none 
        border-l-4 border-transparent  pr-6">
                                            <span class="inline-flex justify-center items-center ml-4">
                                                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                                                    </path>
                                                </svg>
                                            </span>
                                            <span class="ml-2 text-sm tracking-wide truncate">Edit</span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div v-if="showModal" class="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
            aria-modal="true">
            <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <!-- Background overlay -->
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <!-- Modal panel -->
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                    role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <!-- Modal content -->
                    <div>
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-headline">
                                Update Transaction Status
                            </h3>
                            <!-- Add your form here -->
                            <div class="mt-5">
                                <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
                                <select id="status" v-model="newStatus" name="status"
                                    class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 
                                    focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                    <option value="pending">Pending</option>
                                    <option value="failed">Failed</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <!-- Modal footer -->
                    <div class="mt-5 sm:mt-6">
                        <button @click="saveChanges(transaction)" type="button"
                            class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-600 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:text-sm">
                            Save Changes
                        </button>
                        <button @click="closeModal" type="button"
                            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:text-sm">
                            Cancel
                        </button>
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
    data() {
        return {
            showModal: false,
            selectedIndex: null,
            newStatus: 'pending',
            selectedTransaction: null
        };
    },
    methods: {
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
        saveChanges() {
            if (!this.selectedTransaction || !this.selectedTransaction.payment_id) {
                console.error('Transaction or payment_id is undefined.');
                return;
            }

            this.$axios.post('http://localhost:3000/api/updatePayment', {
                payment_id: this.selectedTransaction.payment_id,
                newStatus: this.newStatus
            })
                .then(response => {
                    // Handle success
                    console.log(response.data);
                    // Optionally, emit an event to notify parent component
                    this.$emit('changes-saved');
                    this.closeModal()
                })
                .catch(error => {
                    // Handle error
                    console.error('Error updating payment status:', error);
                });
        },
        openModal(transaction) {
            this.selectedTransaction = transaction;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
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
    color: blue;
}

.edit {
    color: black;
}

#status {
    color: black;
}
</style>
