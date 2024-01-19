<template>
    <section class="relative mx-auto">
        <!-- navbar -->
        <nav class="flex justify-between bg-white-900 text-black w-screen shadow-xl">
            <div class="px-5 xl:px-12 py-6 flex w-full items-center">
                <a class="text-3xl font-bold font-heading" href="/">
                    <img class="h-20" src="/images/Logo2.png" alt="Queen's Collection Logo">

                </a>
                <!-- Nav Links -->
                <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                    <li><a class="hover:text-white-200" href="/">Home</a></li>
                    <li><a class="hover:text-white-200" href="/about">About Us</a></li>
                    <li><a class="hover:text-white-200" href="/shop">Shop</a></li>
                    <li><a class="hover:text-white-200" href="/contact">Contact Us</a></li>
                </ul>
                <!-- Header Icons -->
                <div class="flex items-center space-x-5">
                    <a class="hover:text-white-200" href="/wishlist">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </a>
                    <a class="flex items-center hover:text-white-200" href="/cart">
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
                    </a>
                    <!-- Sign In / Register      -->
                    <a class="flex items-center hover:text-white-200" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-white-200" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </a>


                </div>
            </div>
            <!-- Responsive navbar -->

            <a class="navbar-burger self-center mr-12 xl:hidden md:hidden" href="#" @click="toggleNavbar">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-white-200" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </a>

            <!-- Responsive Nav Links -->
            <ul v-if="isNavOpen"
                class="xl:hidden fixed left-0 top-16 flex flex-col items-start bg-grey-900 text-black w-full shadow-xl">
                <li><a class="hover:text-white-200 py-2 px-4" href="/">Home</a></li>
                <li><a class="hover:text-white-200 py-2 px-4" href="/about">About Us</a></li>
                <li><a class="hover:text-white-200 py-2 px-4" href="/contact">Contact Us</a></li>
                <li><a class="hover:text-white-200 py-2 px-4" href="/shop">Shop</a></li>
            </ul>
        </nav>

    </section>
</template>

<script>
export default {
    name: 'NavBar',
    data() {
        return {
            isNavOpen: false,
        };
    },
    methods: {
        toggleNavbar() {
            this.isNavOpen = !this.isNavOpen;
        },
    },
}
</script>

<style scoped>
img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
}
</style>