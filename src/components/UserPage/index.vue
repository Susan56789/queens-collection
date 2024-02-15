<template>
    <div class="py-16 bg-white">
        <div v-if="localUserData" class="container m-auto px-6 space-y-8 text-gray-500 md:px-12 lg:px-20">
            <div class="md:flex no-wrap md:-mx-2">
                <!-- Left Side -->
                <div class="w-full md:w-3/12 md:mx-2">
                    <!-- Profile Card -->
                    <div
                        class="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
                        <div class="px-6">
                            <div class="flex flex-wrap justify-center">
                                <div class="w-full flex justify-center">
                                    <div class="relative">
                                        <img src="/images/Logo.png"
                                            class="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]" />
                                    </div>
                                </div>
                                <div class="w-full text-center mt-20">


                                </div>
                            </div>
                            <div class="text-center mt-2">
                                <h3 class="text-2xl text-slate-700 font-bold leading-normal mb-1">{{ localUserData.fname }}
                                </h3>
                                <div class="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                                    <i class="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>{{
                                        localUserData.city }}, {{ localUserData.country }}
                                </div>
                            </div>
                            <div class="mt-6 py-6 border-t border-slate-200 text-center">
                                <div class="flex flex-wrap justify-center">
                                    <div class="w-full px-4">
                                        <button @click="logout" class="flex items-center hover:text-white-200">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
                                                </path>
                                            </svg>
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End of profile card -->
                    <div class="my-4"></div>

                </div>
                <!-- Right Side -->
                <div class="w-full md:w-9/12 mx-2 h-auto">
                    <!-- Profile tab -->
                    <!-- About Section -->
                    <div class="bg-white p-3 shadow-sm rounded-sm">
                        <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                            <span clas="text-red-500">
                                <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>
                            <span class="tracking-wide">About</span>
                        </div>
                        <div class="text-gray-700">
                            <div class="grid md:grid-cols-2 text-sm">
                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">First Name</div>
                                    <div class="px-4 py-2">{{ localUserData.fname }}</div>
                                </div>
                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">Last Name</div>
                                    <div class="px-4 py-2">{{ localUserData.lname }}</div>
                                </div>
                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">Gender</div>
                                    <div class="px-4 py-2">{{ localUserData.gender }}</div>
                                </div>
                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">Contact No.</div>
                                    <div class="px-4 py-2">{{ localUserData.phone }}</div>
                                </div>
                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold"> Address</div>
                                    <div class="px-4 py-2">{{ localUserData.address }}</div>
                                </div>

                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">Email.</div>
                                    <div class="px-4 py-2">
                                        <div class="px-4 py-2">{{ localUserData.email
                                        }}</div>
                                    </div>
                                </div>
                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">Birthday</div>
                                    <div class="px-4 py-2"><small>{{ formatDate(localUserData.dob) }}</small></div>
                                </div>

                            </div>
                        </div>

                        <!-- Edit button -->
                        <div v-if="!editMode" class="w-full px-4 mb-4">
                            <button @click="editProfile">Edit</button>
                        </div>
                        <!-- Profile information or edit form -->
                        <div v-if="!editMode">
                            <!-- Profile information -->
                            <div class="text-gray-700">
                                <!-- Profile information code remains unchanged -->
                            </div>
                        </div>
                        <div v-else class=" mx-auto items-center justify-center shadow-lg mx-8 mb-4 max-w-lg">
                            <h2 class="px-4 pt-3 pb-2 text-gray-800 text-lg">Edit your Details:</h2>
                            <!-- Edit form -->
                            <form @submit.prevent="updateProfile" class="w-full max-w-xl bg-white rounded-lg px-4 pt-2">

                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">First Name</div>
                                    <div class="px-4 py-2">
                                        <input v-model="editedUserData.fname" type="text">
                                    </div>
                                    <div class="px-4 py-2 font-semibold">Last Name</div>
                                    <div class="px-4 py-2">
                                        <input v-model="editedUserData.lname" type="text">
                                    </div>
                                    <div class="px-4 py-2 font-semibold">Gender</div>
                                    <div class="px-4 py-2">
                                        <input v-model="editedUserData.gender" type="text">
                                    </div>
                                    <div class="px-4 py-2 font-semibold">Phone:</div>
                                    <div class="px-4 py-2">
                                        <input v-model="editedUserData.phone" type="tel">
                                    </div>
                                    <div class="px-4 py-2 font-semibold">DOB</div>
                                    <div class="px-4 py-2">
                                        <input v-model="editedUserData.dob" type="date">
                                    </div>
                                    <div class="px-4 py-2 font-semibold">Address</div>
                                    <div class="px-4 py-2">
                                        <input v-model="editedUserData.address" type="text">
                                    </div>
                                    <div class="px-4 py-2 font-semibold">City</div>
                                    <div class="px-4 py-2">
                                        <input v-model="editedUserData.city" type="text">
                                    </div>
                                    <div class="px-4 py-2 font-semibold">Country</div>
                                    <div class="px-4 py-2">
                                        <input v-model="editedUserData.country" type="text">
                                    </div>
                                </div>
                                <!-- Other form fields -->
                                <!-- Submit and cancel buttons -->
                                <div class="w-full flex justify-between mt-4 px-4">
                                    <button type="submit">Save</button>
                                    <button @click="cancelEdit">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <!-- End of about section -->

                    <div class="my-4"></div>

                    <!-- Orders -->
                    <div v-if="ordersList.length > 0" class="bg-white p-3 shadow-sm rounded-sm">
                        <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                            <span class="text-red-500">
                                <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </span>
                            <span class="tracking-wide">My Orders</span>
                        </div>
                        <table class="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr>
                                    <th class="py-2 px-4 border-b">Order ID</th>
                                    <th class="py-2 px-4 border-b">Date</th>
                                    <th class="py-2 px-4 border-b">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(order, index) in ordersList" :key="index" class="">
                                    <td class="hover:bg-gray-100 cursor-pointer py-2 px-4 border-b">
                                        <a href="#">{{ order.order_id }}</a>
                                    </td>
                                    <td class="py-2 px-4 border-b">{{ formatDate(order.order_date) }}</td>
                                    <td class="py-2 px-4 border-b">
                                        <p :class="getStatusClass(order.status)">{{ order.status }}</p>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                    <div v-else class="bg-white p-3 shadow-sm rounded-sm">
                        <p>Your Orders Will Appear Here</p>
                    </div>
                    <!-- End of Orders section -->
                </div>
                <!-- End of profile tab -->
            </div>
        </div>
        <div v-else>
            <p>Please <router-link to="/login" class="text-red-500 underline">login</router-link>.</p>
        </div>
    </div>
</template>

<script>
import userService from '@/auth/userService';
import axios from 'axios';

export default {
    name: 'UserPage',
    props: ['userData'],

    data() {
        return {
            localUserData: null,
            ordersList: [],
            editMode: false,
            editedUserData: {},
            orderAmount: 0,
            email: null

        };
    },

    async created() {
        await this.fetchUser();
        await this.fetchOrders();
        await this.fetchTransactions(this.email);

    },

    methods: {
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
        async fetchUser() {
            try {
                const userDataQueryParam = this.$route.query.userData;

                if (userDataQueryParam) {
                    // Parse the query parameter string to JSON
                    const userData = JSON.parse(decodeURIComponent(userDataQueryParam));
                    this.localUserData = userData[0]; // Assuming userData is an array with a single user object
                    this.email = this.localUserData.email
                    this.saveUserDataToLocalStorage();
                } else {
                    // Check if user data is stored in local storage and not expired
                    const storedUserData = localStorage.getItem('userData');
                    const storedTimestamp = localStorage.getItem('userDataTimestamp');

                    if (storedUserData && storedTimestamp && Date.now() - storedTimestamp < 30 * 60 * 1000) {
                        this.localUserData = JSON.parse(storedUserData);
                    } else {
                        // Otherwise, fetch user data using the userService
                        const fetchedUserData = await userService.getUserData();
                        this.localUserData = fetchedUserData;
                        // Save user data to local storage with a timestamp
                        this.saveUserDataToLocalStorage();
                    }
                }

                // If localUserData is still null, redirect to login
                if (!this.localUserData) {
                    this.$router.push('/login');
                    return;
                }

                // Fetch orders after user data is obtained
                await this.fetchOrders(this.localUserData.email); // Pass the email from localUserData
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        },


        saveUserDataToLocalStorage() {
            localStorage.setItem('userData', JSON.stringify(this.localUserData));
            localStorage.setItem('userDataTimestamp', Date.now());
        },
        async fetchTransactions(email) {
            try {
                this.loading = true;
                const response = await axios.get(`http://localhost:3000/api/payments/email/${email}`);

                for (const transaction of response.data) {
                    const paymentDate = new Date(transaction.payment_date);
                    for (const order of this.ordersList) {
                        const orderDate = new Date(order.order_date);
                        if (paymentDate.toDateString() === orderDate.toDateString()) {
                            // Update the status of the current order
                            order.status = transaction.status;
                            break; // Break out of the loop after updating the status
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                this.loading = false;
            }
        },


        async fetchOrders(email) {
            email = this.email
            try {
                // Ensure that email is properly set
                if (!email) {
                    console.error('Email is not provided.');
                    return;
                }

                const response = await fetch(`http://localhost:3000/api/orders/email/${email}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const orders = await response.json();
                const sortedOrders = orders.sort((a, b) => b.order_id - a.order_id);

                // Select the latest 10 orders
                const latestOrders = sortedOrders.slice(0, 10);

                // Assign latest orders to the ordersList data property
                this.ordersList = latestOrders;
            } catch (error) {
                console.error('Error fetching orders:', error);
                // Handle error, e.g., show a notification to the user
            }
        },


        logout() {
            userService.logout();
            this.$router.push('/login'); // Redirect to login page after logout
        },

        editProfile() {
            this.editMode = true;
            this.editedUserData = { ...this.localUserData };
        },

        cancelEdit() {
            this.editMode = false;
            this.editedUserData = {};
        },
        async updateProfile() {
            try {
                // Calculate age from date of birth
                const dobDate = new Date(this.editedUserData.dob);
                const today = new Date();
                let age = today.getFullYear() - dobDate.getFullYear();
                const dobMonth = dobDate.getMonth();
                const todayMonth = today.getMonth();
                if (todayMonth < dobMonth || (todayMonth === dobMonth && today.getDate() < dobDate.getDate())) {
                    age--;
                }

                // Check if age is 18 or over
                if (age < 18) {
                    // If age is less than 18, show alert and do not proceed with update
                    alert('Age must be 18 and over.');
                    return;
                }

                // If age is 18 or over, proceed with the update
                const response = await axios.post('http://localhost:3000/api/user/update', this.editedUserData);

                if (response.status === 200) {
                    // Update localUserData with editedUserData
                    this.localUserData = { ...this.editedUserData };
                    this.saveUserDataToLocalStorage();

                    // Exit edit mode
                    this.cancelEdit();
                } else {
                    throw new Error('Failed to update profile');
                }
            } catch (error) {
                console.error('Error updating profile:', error);
                // Handle error
            }
        },



    },
}

</script>



<style scoped>
:root {
    --main-color: red;
}

.bg-main-color {
    background-color: var(--main-color);
}

.text-main-color {
    color: var(--main-color);
}

.border-main-color {
    border-color: var(--main-color);
}

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

.processing {
    color: chocolate;
}

#status {
    color: black;
}
</style>