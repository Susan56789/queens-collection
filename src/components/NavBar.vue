<template>
    <section class="relative mx-auto">
        <!-- navbar -->
        <nav class="flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row">
            <div class="px-5 xl:px-12 py-6 flex w-full items-center">
                <a class="text-3xl font-bold font-heading" href="/">
                    <img class="h-20" src="/images/Logo2.png" alt="Queen's Collection Logo">

                </a>
                <!-- Nav Links -->
                <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                    <li><router-link class="hover:text-white-200" to="/">Home</router-link></li>
                    <li><router-link class="hover:text-white-200" to="/about">About Us</router-link></li>
                    <li><router-link class="hover:text-white-200" to="/shop">Shop</router-link></li>
                    <li><router-link class="hover:text-white-200" to="/contact">Contact Us</router-link></li>
                </ul>
                <!-- Header Icons -->
                <div class="flex items-center space-x-5">
                    <router-link class="hover:text-white-200" to="/wishlist">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </router-link>
                    <router-link class="flex items-center hover:text-white-200" to="/cart">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span class="flex absolute -mt-5 ml-4">
                            <span
                                class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
                            </span>
                        </span>
                    </router-link>
                    <!-- Sign In / Register Section -->
                    <router-link v-if="!isLoggedIn" class="flex items-center hover:text-white-200" to="/login">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-white-200" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </router-link>
                    <router-link v-else class="flex items-center hover:text-white-200" to="/user-account">

                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-white-200" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">

                            <circle cx="12" cy="12" r="10" />
                        </svg>
                    </router-link>
                </div>
            </div>

            <!-- Toggle Button -->
            <a class="rounded-lg md:hidden focus:outline-none 
            focus:shadow-outline absolute top-0 right-0 mr-5 mt-5" href="#" @click="toggleNavbar">
                <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
                    <path v-if="!isNavOpen" fill-rule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                        clip-rule="evenodd"></path>
                    <path v-if="isNavOpen" fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
            </a>

            <!-- Responsive Nav Links -->
            <div class="responsive-nav">
                <ul v-if="isNavOpen" class="xl:hidden fixed mt-50 ml-50 
                    flex flex-col items-start bg-grey-900 text-black w-full shadow-xl">
                    <li><router-link class="hover:text-white-200 py-2 px-4" to="/">Home</router-link></li>
                    <li><router-link class="hover:text-white-200 py-2 px-4" to="/about">About Us</router-link></li>
                    <li><router-link class="hover:text-white-200 py-2 px-4" to="/contact">Contact Us</router-link></li>
                    <li><router-link class="hover:text-white-200 py-2 px-4" to="/shop">Shop</router-link></li>
                </ul>

            </div>

        </nav>

    </section>
</template>

<script>


export default {
    name: 'NavBar',
    data() {
        return {
            isNavOpen: false,
        }
    },
    methods: {
        toggleNavbar() {
            this.isNavOpen = !this.isNavOpen;
        },
    }
}
</script>

<style scoped>
img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
}

.responsive-nav {
    margin-bottom: 50px;
}
</style>