<template>
    <div class="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold leading-none text-gray-900">Latest Customers</h3>
            <router-link to="/all-customers"
                class="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2">
                View all
            </router-link>
        </div>
        <div class="flow-root">
            <ul role="list" class="divide-y divide-gray-200">
                <li v-for="(customer, index) in latestCustomers" :key="index" class="py-3 sm:py-4">
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
    </div>
</template>

<script>
export default {
    name: 'LatestCustomers',
    props: {
        transactions: Array
    },
    methods: {
        formatCurrency(value) {
            const numericValue = parseFloat(value);
            if (isNaN(numericValue) || numericValue === 0) {
                return 'KES 0.00'; // Return 'KES 0.00' when the value is not a valid number or is 0
            } else {
                return numericValue.toLocaleString('en-KE', { style: 'currency', currency: 'KES' });
            }
        },
    },
    computed: {
        latestCustomers() {
            const latestCustomers = [];
            const customerMap = new Map(); // Use a Map to store customer email as key and total spent as value

            // Iterate over transactions to extract unique customer information
            for (const transaction of this.transactions) {
                const customerEmail = transaction.email;
                const customerName = transaction.customer_name; // Retrieve customer name from transaction
                const transactionAmount = parseFloat(transaction.amount);
                const transactionDate = new Date(transaction.payment_date);
                const currentDate = new Date();
                const sevenDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));

                // Check if the transaction occurred within the last 7 days and if transaction amount is valid
                if (!isNaN(transactionAmount) && transactionDate > sevenDaysAgo) {
                    // Check if customer email already exists in the Map
                    if (customerMap.has(customerEmail)) {
                        // If customer email exists, add the transaction amount to the total spent
                        const totalSpent = customerMap.get(customerEmail) + transactionAmount;
                        customerMap.set(customerEmail, totalSpent);
                    } else {
                        // If customer email does not exist, set the total spent as the transaction amount
                        customerMap.set(customerEmail, transactionAmount);
                    }
                }

                // Store customer name along with email and total spent
                latestCustomers.push({
                    email: customerEmail,
                    customer_name: customerName, // Include customer name
                    totalSpent: customerMap.get(customerEmail) || 0 // Get total spent from Map or default to 0
                });
            }

            // Sort latest customers by total spent in descending order
            latestCustomers.sort((a, b) => b.totalSpent - a.totalSpent);

            // Return the latest 10 customers
            return latestCustomers.slice(0, 10);
        }
    }
};
</script>
