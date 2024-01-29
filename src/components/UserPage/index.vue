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
                                        <p class="font-light leading-relaxed text-slate-600 mb-4">My bio</p>

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
                                    <div class="px-4 py-2">{{ localUserData.dob }}</div>
                                </div>
                            </div>
                        </div>

                        <button @click="logout" class="flex items-center hover:text-white-200">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
                                </path>
                            </svg>
                        </button>
                    </div>
                    <!-- End of about section -->

                    <div class="my-4"></div>

                    <!-- Orders -->
                    <div class="bg-white p-3 shadow-sm rounded-sm">
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
                                <tr class="">
                                    <td class="hover:bg-gray-100 cursor-pointer py-2 px-4 border-b">
                                        <a href="#">Order1</a>
                                    </td>
                                    <td class="py-2 px-4 border-b">March 2020</td>
                                    <td class="py-2 px-4 border-b">Pending</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <!-- End of Orders section -->
                </div>
                <!-- End of profile tab -->
            </div>
        </div>
    </div>
</template>

<script>
import userService from '@/auth/userService';

export default {
    name: 'UserPage',
    props: ['userData'],

    data() {
        return {
            localUserData: null,
        };
    },

    async created() {
        await this.fetchUser();
    },

    methods: {
        async fetchUser() {
            try {
                // If userData is provided as a query parameter, use it directly
                const userDataQueryParam = this.$route.query.userData;

                if (userDataQueryParam) {
                    this.localUserData = JSON.parse(userDataQueryParam);
                    console.log('fetchedUserData', this.localUserData)
                    return;
                }

                // Otherwise, fetch user data using the userService
                const fetchedUserData = await userService.getUserData();
                this.localUserData = fetchedUserData;

                console.log('fetchedUserData', this.localUserData)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        },
        logout() {
            userService.logout();
            this.$router.push('/login'); // Redirect to login page after logout
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
</style>