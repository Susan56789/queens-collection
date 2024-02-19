<template>
    <div>
        <main class="mt-4 mx-4">
            <div class="w-full overflow-hidden rounded-lg shadow-xs">
                <div class="mt-4 flex flex-col">
                    <div class="mx-6">
                        <div class="w-full px-6 mt-6  sm:mt-0">
                            <div class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                                <div class="p-3 bg-orange-600 bg-opacity-75 rounded-full">
                                    <svg class="w-8 h-8 text-white" viewBox="0 0 28 28" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M4.19999 1.4C3.4268 1.4 2.79999 2.02681 2.79999 2.8C2.79999 3.57319 3.4268 4.2 4.19999 4.2H5.9069L6.33468 5.91114C6.33917 5.93092 6.34409 5.95055 6.34941 5.97001L8.24953 13.5705L6.99992 14.8201C5.23602 16.584 6.48528 19.6 8.97981 19.6H21C21.7731 19.6 22.4 18.9732 22.4 18.2C22.4 17.4268 21.7731 16.8 21 16.8H8.97983L10.3798 15.4H19.6C20.1303 15.4 20.615 15.1004 20.8521 14.6261L25.0521 6.22609C25.2691 5.79212 25.246 5.27673 24.991 4.86398C24.7357 4.45123 24.2852 4.2 23.8 4.2H8.79308L8.35818 2.46044C8.20238 1.83722 7.64241 1.4 6.99999 1.4H4.19999Z"
                                            fill="currentColor"></path>
                                        <path
                                            d="M22.4 23.1C22.4 24.2598 21.4598 25.2 20.3 25.2C19.1403 25.2 18.2 24.2598 18.2 23.1C18.2 21.9402 19.1403 21 20.3 21C21.4598 21 22.4 21.9402 22.4 23.1Z"
                                            fill="currentColor"></path>
                                        <path
                                            d="M9.1 25.2C10.2598 25.2 11.2 24.2598 11.2 23.1C11.2 21.9402 10.2598 21 9.1 21C7.9402 21 7 21.9402 7 23.1C7 24.2598 7.9402 25.2 9.1 25.2Z"
                                            fill="currentColor"></path>
                                    </svg>
                                </div>

                                <div class="mx-5">
                                    <h4 class="text-2xl font-semibold text-gray-700">{{ totalOrders }}</h4>
                                    <div class="text-gray-500">Total Orders</div>
                                </div>
                            </div>
                        </div>

                        <OrderStatus :orders="orders" class="mt-8" />
                    </div>
                </div>

                <div class="mt-8">

                </div>

                <div class="flex flex-col mt-8">
                    <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div
                            class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                            <table class="min-w-full">
                                <thead>
                                    <tr>
                                        <th
                                            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                            Name</th>
                                        <th
                                            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                            Address</th>
                                        <th
                                            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                            Amount
                                        </th>

                                        <th
                                            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                            Status</th>

                                        <th
                                            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                            Order ID</th>
                                        <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                                    </tr>
                                </thead>

                                <tbody v-for="(order, index) in  pagedOrders" :key="index" class="bg-white">
                                    <tr>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0 w-10 h-10">
                                                    <img class="w-10 h-10 rounded-full" src="/images/Logo.png"
                                                        :alt="order.customer_name">
                                                </div>

                                                <div class="ml-4">
                                                    <div class="text-sm font-medium leading-5 text-gray-900">
                                                        {{
                                                            order.customer_name }}
                                                    </div>
                                                    <div class="text-sm leading-5 text-gray-500">
                                                        <a :href="'mailto:' + order.email" class="__cf_email__"
                                                            v-html="order.email">

                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td class="px-6 py-4 text-sm leading-5 text-gray-500 
                                        whitespace-no-wrap border-b border-gray-200">
                                            {{
                                                order.address }}
                                        </td>
                                        <td class="px-6 py-4 text-sm leading-5 text-gray-500 
                                        whitespace-no-wrap border-b border-gray-200">
                                            {{ formatCurrency(order.totalSpent) }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <span class="inline-flex px-2 text-xs font-semibold leading-5  rounded-full"
                                                :id="getStatusId(order.status)"> {{
                                                    order.status }}</span>
                                        </td>

                                        <td class="px-6 py-4 text-sm leading-5 text-gray-500 
                                            whitespace-no-wrap border-b border-gray-200">
                                            {{
                                                order.id }}
                                        </td>

                                        <td class="p-4 whitespace-nowrap text-sm font-semibold edit">
                                            <button @click="openModal(order)" class="relative flex flex-row items-center h-11 focus:outline-none 
            border-l-4 border-transparent  pr-6">
                                                <span class="inline-flex justify-center items-center ml-4">
                                                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
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
                                        Update Order Status
                                    </h3>
                                    <!-- Add your form here -->
                                    <div class="mt-5">
                                        <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
                                        <select id="status" v-model="newStatus" name="status"
                                            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 
                                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="failed">Failed</option>
                                            <option value="delivery">oUT FOR dELIVERY</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <!-- Modal footer -->
                            <div class="mt-5 sm:mt-6">
                                <button @click="saveChanges(neworder)" type="button" class="inline-flex justify-center w-full rounded-md border 
                                    border-transparent shadow-sm px-4 py-2 bg-cyan-600 text-base 
                                    font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 
                                    focus:ring-offset-2 focus:ring-cyan-500 sm:text-sm">
                                    Save Changes
                                </button>
                                <button @click="closeModal" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border
                                     border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium 
                                     text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2
                                      focus:ring-gray-500 sm:text-sm">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <div
            class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 bg-gray-800">
            <span class="flex items-center col-span-3"> Showing {{ pagedOrders.length }} of {{ totalOrders }}
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
import OrderStatus from '@/components/AdminDashboard/OrdersPage/OrderStatus'

export default {
    name: 'OrdersPage',
    data() {
        return {
            orders: [],
            currentPage: 1,
            pageSize: 15,
            totalPages: 0,
            totalOrders: 0,
            showModal: false,
            selectedIndex: null,
            newStatus: 'pending',
            selectedOrder: null
        }
    },
    components: {
        OrderStatus
    },
    computed: {
        pagedOrders() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.orders.slice(startIndex, endIndex);
        }
    },
    created() {
        this.fetchOrders();
    },
    methods: {
        fetchOrders() {
            axios.get('http://localhost:3000/api/orders')
                .then(response => {
                    // Sort orders by order_date in descending order
                    response.data.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
                    // Extract customer name, email, and amount from orders
                    const latestOrders = response.data.map(order => ({
                        customer_name: order.user_name,
                        email: order.email,
                        address: order.address,
                        totalSpent: parseFloat(order.total_amount),
                        id: order.order_id,
                        status: order.status,
                        payment_date: order.order_date
                    }));
                    this.orders = latestOrders;
                    this.totalOrders = latestOrders.length;

                    this.totalPages = Math.ceil(latestOrders.length / this.pageSize);

                })
                .catch(error => {
                    console.error("Error fetching orders:", error);
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
                this.fetchOrders();
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.fetchOrders();
            }
        },
        changePage(pageNumber) {
            this.currentPage = pageNumber;
            this.fetchOrders();
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
        saveChanges() {
            if (!this.selectedOrder || !this.selectedOrder.id) {
                console.error('Error: Selected order or order_id is undefined.', this.selectedOrder);
                return;
            }

            // Ensure that this.$axios is correctly defined and configured
            this.$axios.post('http://localhost:3000/api/updateStatus', {
                order_id: this.selectedOrder.id,
                newStatus: this.newStatus
            })
                .then(response => {
                    // Handle success
                    console.log(response.data);
                    // Optionally, emit an event to notify the parent component
                    this.$emit('changes-saved');
                    this.closeModal();
                })
                .catch(error => {
                    // Handle error
                    console.error('Error updating payment status:', error);
                });
        },

        openModal(neworder) {
            this.selectedOrder = neworder;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        getStatusId(status) {
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

    }
}

</script>

<style scoped>
.edit {
    color: black;
}

#status {
    color: black;
}

#pending {
    background: chartreuse;
}

#failed {
    background: red;
}

#completed {
    background: green;
}

#unknown {
    background: blue;
}

#processing {
    background: chocolate;
}
</style>