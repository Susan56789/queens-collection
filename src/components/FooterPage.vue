<template>
    <footer class="bg-white dark:bg-red-900">
        <div class="container px-6 py-12 mx-auto">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                <div class="sm:col-span-2">
                    <h1 class="max-w-lg text-xl font-semibold tracking-tight
                     text-red-800 xl:text-2xl dark:text-white">
                        Subscribe Our Newsletter.</h1>

                    <div class="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                        <input id="email" type="text"
                            class="px-4 py-2 text-red-700 bg-white border rounded-md 
                            dark:bg-red-900 dark:text-red-300 dark:border-red-600 focus:border-white-400
                             dark:focus:border-white-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-white-300"
                            placeholder="Email Address">

                        <button class="w-full px-6 py-2.5 text-sm font-medium tracking-wider 
                            text-white transition-colors duration-300 transform md:w-auto md:mx-4 
                            focus:outline-none bg-red-800 rounded-lg hover:bg-red-700 focus:ring 
                            focus:ring-red-300 focus:ring-opacity-80">
                            Subscribe
                        </button>
                    </div>
                </div>

                <div>
                    <p class="font-semibold text-red-800 dark:text-white">Quick Link</p>

                    <div class="flex flex-col items-start mt-5 space-y-2">
                        <a href="/" class="text-red-600 transition-colors duration-300 dark:text-red-300 
                            dark:hover:text-white-400 hover:underline hover:text-white-500">Home</a>
                        <a href="/about" class="text-red-600 transition-colors duration-300 dark:text-red-300 
                            dark:hover:text-white-400 hover:underline hover:text-white-500">
                            About Us
                        </a>
                        <a href="/contact" class="text-red-600 transition-colors duration-300 dark:text-red-300
                             dark:hover:text-white-400 hover:underline hover:text-white-500">
                            Contact Us
                        </a>
                        <a href="#" class="text-red-600 transition-colors duration-300 
                            dark:text-red-300 dark:hover:text-white-400 hover:underline
                             hover:text-white-500">
                            On Sale Items
                        </a>
                        <a href="/faqs" class="text-red-600 transition-colors duration-300 dark:text-red-300
                             dark:hover:text-white-400 hover:underline hover:text-white-500">
                            FAQs
                        </a>
                    </div>
                </div>

                <div>
                    <p class="font-semibold text-red-800 dark:text-white">Categories</p>

                    <div class="flex flex-col items-start mt-5 space-y-2">
                        <a href="#" class="text-red-600 transition-colors duration-300 dark:text-red-300 
                            dark:hover:text-white-400 hover:underline hover:text-white-500">
                            Mens
                        </a>
                        <a href="#" class="text-red-600 transition-colors duration-300 dark:text-red-300
                             dark:hover:text-white-400 hover:underline hover:text-white-500">
                            Women
                        </a>
                        <a href="#" class="text-red-600 transition-colors duration-300 dark:text-red-300 
                            dark:hover:text-white-400 hover:underline hover:text-white-500">
                            Children
                        </a>
                        <a href="#" class="text-red-600 transition-colors duration-300 dark:text-red-300
                             dark:hover:text-white-400 hover:underline hover:text-white-500">
                            Sports Wear
                        </a>
                        <a href="#" class="text-red-600 transition-colors duration-300 dark:text-red-300
                             dark:hover:text-white-400 hover:underline hover:text-white-500">
                            Household
                        </a>
                    </div>
                </div>
            </div>

            <hr class="my-6 border-red-200 md:my-8 dark:border-red-700">

            <div class="flex items-center justify-between">
                <a href="#">
                    <img class="w-auto h-7" src="/images/Logo3.png" alt="">
                </a>

                <div class="flex -mx-2">
                    <a href="#"
                        class="mx-2 text-red-600 transition-colors duration-300 dark:text-red-300 hover:text-white-500 dark:hover:text-white-400"
                        aria-label="Twitter">
                        <i class="fa-brands fa-square-x-twitter"></i>
                    </a>

                    <a href="#"
                        class="mx-2 text-red-600 transition-colors duration-300 dark:text-red-300 hover:text-white-500 dark:hover:text-white-400"
                        aria-label="Facebook">
                        <i class="fa-brands fa-facebook"></i>
                    </a>

                    <a href="#"
                        class="mx-2 text-red-600 transition-colors duration-300 dark:text-red-300 hover:text-white-500 dark:hover:text-white-400"
                        aria-label="Linkedin">
                        <i class="fa-brands fa-linkedin"></i>

                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'FooterPage'
}
</script>

<style scoped>
img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
}
</style>