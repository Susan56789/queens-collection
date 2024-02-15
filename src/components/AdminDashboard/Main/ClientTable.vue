<template>
    <!-- Client Table -->
    <div class="mt-4 mx-4">
        <div class="w-full overflow-hidden rounded-lg shadow-xs">
            <div class="w-full overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr
                            class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 bg-gray-800">
                            <th class="px-4 py-3">Client</th>
                            <th class="px-4 py-3">Amount</th>
                            <th class="px-4 py-3">Status</th>
                            <th class="px-4 py-3">Date</th>
                        </tr>
                    </thead>
                    <tbody v-if="pagedTransactions.length > 0" class="bg-white divide-y dark:divide-gray-700 bg-gray-800">
                        <tr v-for="(customer, index) in pagedTransactions" :key="index"
                            class="bg-gray-50 bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                            <td class="px-4 py-3">
                                <div class="flex items-center text-sm">
                                    <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                        <img class="object-cover w-full h-full rounded-full" src="/images/Logo.png"
                                            :alt="customer.customer_name" loading="lazy" />
                                        <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                    </div>
                                    <div>
                                        <p class="font-semibold">{{ customer.customer_name }}</p>
                                        <p class="text-xs text-gray-600 dark:text-gray-400">
                                            <a :href="'mailto:' + customer.email" class="__cf_email__"
                                                v-html="customer.email">

                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-4 py-3 text-sm">{{ customer.totalSpent }}</td>
                            <td class="px-4 py-3 text-xs">
                                <span
                                    class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                    {{ customer.status }} </span>
                            </td>
                            <td class="px-4 py-3 text-sm">{{ formatDate(customer.payment_date) }}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <div
                class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 bg-gray-800">
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
    </div>
    <!-- ./Client Table -->
</template>


<script>
export default {
    name: 'ClientTable',
    data() {
        return {
            loading: false,
            latestCustomers: [],
            currentPage: 1,
            pageSize: 15,
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
            this.$axios.get(`http://localhost:3000/api/transactions`)
                .then(response => {
                    // Sort transactions by payment_date in descending order
                    response.data.sort((a, b) => new Date(b.payment_date) - new Date(a.payment_date));

                    // Extract customer name, email, and amount from transactions
                    const latestCustomer = response.data.map(transaction => ({
                        customer_name: transaction.customer_name,
                        email: transaction.email,
                        totalSpent: parseFloat(transaction.amount),
                        status: transaction.status,
                        payment_date: transaction.payment_date
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
        formatDate(dob) {
            const date = new Date(dob);
            const dayOfMonth = date.getDate();
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();

            // Get the ordinal suffix for the day
            const daySuffix = this.getDaySuffix(dayOfMonth);

            return `${dayOfMonth}${daySuffix} ${month} ${year}`;
        },

        getDaySuffix(day) {
            if (day >= 11 && day <= 13) {
                return 'th';
            }

            switch (day % 10) {
                case 1:
                    return 'st';
                case 2:
                    return 'nd';
                case 3:
                    return 'rd';
                default:
                    return 'th';
            }
        },

    },
    mounted() {
        this.fetchTransactions();
    }
}
</script>