<template>
    <div class='flex items-center justify-center min-h-screen from-gray-700 via-gray-800 to-gray-900 bg-gradient-to-br'>
        <div
            class="relative w-full group max-w-md min-w-0 mx-auto mt-6 mb-6 break-words bg-white border shadow-2xl dark:bg-gray-800 dark:border-gray-700 md:max-w-sm rounded-xl">
            <div class="pb-6">
                <div class="flex flex-wrap justify-center">
                    <div class="flex justify-center w-full">
                        <div class="relative">
                            <img src="data:image/jpeg;base64,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"
                                class="dark:shadow-xl border-white dark:border-gray-800 rounded-full align-middle border-8 absolute -m-16 -ml-18 lg:-ml-16 max-w-[150px]" />
                        </div>
                    </div>
                </div>
                <div class="mt-2 mt-20 text-center">
                    <h3 class="mb-1 text-2xl font-bold leading-normal text-gray-700 dark:text-gray-300">Susan W</h3>
                    <div class="flex flex-row justify-center w-full mx-auto space-x-2 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <!-- /typography/_h3.antlers.html -->
                        <div class="text-sm font-bold tracking-wide text-gray-600 dark:text-gray-300 font-mono text-xl">
                            Nairobi</div>
                        <!-- End: /typography/_h3.antlers.html -->
                    </div>
                    <div class="w-full text-center">
                        <div class="flex justify-center pt-8 pb-0 lg:pt-4">
                            <div class="flex space-x-2">
                                <a class="p-1 -m-1 text-gray-400 hover:text-amber-500 focus:outline-none focus-visible:ring-2 ring-primary"
                                    href="#" rel="noopener" aria-label="Ariel Cerda on Twitter" target="_blank">
                                    <svg class="w-6 h-6 overflow-visible fill-current" alt="" aria-hidden="true"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84">
                                        </path>
                                    </svg>
                                </a>

                                <a class="p-1 -m-1 text-gray-400 hover:text-amber-500 focus:outline-none focus-visible:ring-2 ring-primary"
                                    href="#" rel="noopener" aria-label="Ariel Cerda on Github" target="_blank">
                                    <svg class="w-6 h-6 overflow-visible fill-current" alt="" aria-hidden="true"
                                        viewBox="0 0 140 140">
                                        <path
                                            d="M70 1.633a70 70 0 00-21.7 136.559h1.692a5.833 5.833 0 006.183-6.184v-1.225-6.358a2.917 2.917 0 00-1.167-1.925 2.917 2.917 0 00-2.45-.583C36.925 125.3 33.6 115.5 33.367 114.858a27.067 27.067 0 00-10.034-12.775 6.767 6.767 0 00-.875-.641 3.675 3.675 0 012.217-.409 8.575 8.575 0 016.708 5.134 17.5 17.5 0 0023.334 6.766 2.917 2.917 0 001.691-2.1 11.667 11.667 0 013.267-7.175 2.917 2.917 0 00-1.575-5.075c-13.825-1.575-27.942-6.416-27.942-30.275a23.333 23.333 0 016.125-16.216A2.917 2.917 0 0036.808 49a20.533 20.533 0 01.059-14 32.317 32.317 0 0114.7 6.708 2.858 2.858 0 002.45.409A61.892 61.892 0 0170 39.958a61.075 61.075 0 0116.042 2.159 2.858 2.858 0 002.391-.409 32.608 32.608 0 0114.7-6.708 20.825 20.825 0 010 13.883 2.917 2.917 0 00.525 3.092 23.333 23.333 0 016.125 16.042c0 23.858-14.175 28.641-28.058 30.216a2.917 2.917 0 00-1.575 5.134 12.833 12.833 0 013.558 10.15v18.55a6.183 6.183 0 002.1 4.841 7 7 0 006.184 1.109A70 70 0 0070 1.633z">
                                        </path>
                                    </svg>
                                </a>

                                <a class="p-1 -m-1 text-gray-400 hover:text-amber-500 focus:outline-none focus-visible:ring-2 ring-primary"
                                    href="#" rel="noopener" aria-label="Ariel Cerda on Linkedin" target="_blank">
                                    <svg class="w-6 h-6 overflow-visible fill-current" alt="" aria-hidden="true"
                                        viewBox="0 0 140 140">
                                        <path
                                            d="M23.4 44.59h-4.75a12.76 12.76 0 00-9.73 2.19 9.44 9.44 0 00-2.35 7.12V131a9.08 9.08 0 002.3 7 9.24 9.24 0 006.82 2c2.22 0 4.15-.21 8.24-.06a12 12 0 009.25-2 9.1 9.1 0 002.29-7V53.9a9.44 9.44 0 00-2.34-7.12 12.68 12.68 0 00-9.73-2.19zM21 0A16.19 16.19 0 005.09 15.6 16.52 16.52 0 0021 31.86 16.12 16.12 0 0037 15.6 16.18 16.18 0 0021 0zM99.74 43.63a31.09 31.09 0 00-20.93 6.3A7.25 7.25 0 0077 46.34a6.08 6.08 0 00-4.52-1.78 119.08 119.08 0 00-15 .3c-4.16.84-6.18 3.79-6.18 9V131a9.14 9.14 0 002.28 7 12.06 12.06 0 009.26 2c4.47-.17 5.74.06 8.22.06a9.26 9.26 0 006.83-2 9.12 9.12 0 002.3-7V89.88A12.48 12.48 0 0192.93 76 12.44 12.44 0 01106 89.88V131a9.1 9.1 0 002.29 7 12 12 0 009.24 2c1.83-.07 4-.07 5.8 0a12.09 12.09 0 009.26-2 9.14 9.14 0 002.28-7V78.32a33.07 33.07 0 00-35.13-34.69z">
                                        </path>
                                    </svg>
                                </a>

                                <a class="p-1 -m-1 text-gray-400 hover:text-amber-500 focus:outline-none focus-visible:ring-2 ring-primary"
                                    href="#" rel="noopener" aria-label="Ariel Cerda on Instagram" target="_blank">
                                    <svg class="w-6 h-6 overflow-visible fill-current" alt="" aria-hidden="true"
                                        viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M73.1735 2C89.9405 2 92.3831 2.0897 99.4487 2.414C106.79 2.7521 111.807 3.9182 116.195 5.6225C120.801 7.35353 124.973 10.0686 128.422 13.5782C131.931 17.0266 134.646 21.1993 136.378 25.805C138.082 30.1934 139.248 35.2097 139.586 42.5513C139.917 49.9136 140 52.2596 140 71V71.552C140 89.7887 139.917 92.1623 139.586 99.4487C139.248 106.79 138.082 111.807 136.378 116.195C134.646 120.801 131.931 124.973 128.422 128.422C124.973 131.931 120.801 134.646 116.195 136.378C111.807 138.082 106.79 139.248 99.4487 139.586C92.0864 139.917 89.7404 140 71 140H70.448C52.2113 140 49.8377 139.917 42.5513 139.586C35.2097 139.248 30.1934 138.082 25.805 136.378C21.1993 134.646 17.0266 131.931 13.5782 128.422C10.0686 124.973 7.35353 120.801 5.6225 116.195C3.9182 111.807 2.7521 106.79 2.414 99.4487C2.0897 92.3831 2 89.9336 2 73.1735V68.8265C2 52.0595 2.0897 49.6169 2.414 42.5513C2.7521 35.2097 3.9182 30.1934 5.6225 25.805C7.35353 21.1993 10.0686 17.0266 13.5782 13.5782C17.0266 10.0686 21.1993 7.35353 25.805 5.6225C30.1934 3.9182 35.2097 2.7521 42.5513 2.414C49.6169 2.0897 52.0664 2 68.8265 2H73.1735V2ZM72.6146 14.4338H69.3854C52.439 14.4338 50.1758 14.5097 43.1171 14.834C36.3896 15.1445 32.7395 16.2623 30.3038 17.2076C27.0815 18.4634 24.7838 19.9538 22.3688 22.3688C19.9538 24.7838 18.4634 27.0815 17.2076 30.3038C16.2623 32.7395 15.1376 36.3896 14.834 43.1171C14.5097 50.1758 14.4338 52.439 14.4338 69.3854V72.6146C14.4338 89.561 14.5097 91.8242 14.834 98.8829C15.1445 105.61 16.2623 109.261 17.2076 111.696C18.4634 114.912 19.9607 117.216 22.3688 119.631C24.7838 122.046 27.0815 123.537 30.3038 124.792C32.7395 125.738 36.3896 126.862 43.1171 127.166C50.3897 127.497 52.5701 127.566 71 127.566H71.552C89.4713 127.566 91.6793 127.497 98.876 127.166C105.61 126.855 109.261 125.738 111.696 124.792C114.912 123.537 117.216 122.046 119.631 119.631C122.046 117.216 123.537 114.919 124.792 111.696C125.738 109.261 126.862 105.61 127.166 98.8829C127.497 91.6034 127.566 89.4299 127.566 71V70.448C127.566 52.5287 127.497 50.3207 127.166 43.124C126.855 36.3896 125.738 32.7395 124.792 30.3038C123.687 27.3062 121.923 24.5947 119.631 22.3688C117.405 20.077 114.694 18.3134 111.696 17.2076C109.261 16.2623 105.61 15.1376 98.8829 14.834C91.8242 14.5097 89.561 14.4338 72.6146 14.4338ZM71 35.5685C75.6529 35.5685 80.2603 36.485 84.559 38.2656C88.8578 40.0462 92.7637 42.656 96.0539 45.9461C99.344 49.2363 101.954 53.1422 103.734 57.441C105.515 61.7397 106.432 66.3471 106.432 71C106.432 75.6529 105.515 80.2603 103.734 84.559C101.954 88.8578 99.344 92.7637 96.0539 96.0539C92.7637 99.344 88.8578 101.954 84.559 103.734C80.2603 105.515 75.6529 106.432 71 106.432C61.603 106.432 52.5908 102.699 45.9461 96.0539C39.3015 89.4092 35.5685 80.397 35.5685 71C35.5685 61.603 39.3015 52.5908 45.9461 45.9461C52.5908 39.3015 61.603 35.5685 71 35.5685V35.5685ZM71 48.0023C64.9006 48.0023 59.0511 50.4253 54.7382 54.7382C50.4253 59.0511 48.0023 64.9006 48.0023 71C48.0023 77.0994 50.4253 82.9489 54.7382 87.2618C59.0511 91.5747 64.9006 93.9977 71 93.9977C77.0994 93.9977 82.9489 91.5747 87.2618 87.2618C91.5747 82.9489 93.9977 77.0994 93.9977 71C93.9977 64.9006 91.5747 59.0511 87.2618 54.7382C82.9489 50.4253 77.0994 48.0023 71 48.0023V48.0023ZM107.832 25.8878C110.028 25.8878 112.134 26.7602 113.687 28.313C115.24 29.8658 116.112 31.9718 116.112 34.1678C116.112 36.3638 115.24 38.4698 113.687 40.0226C112.134 41.5754 110.028 42.4478 107.832 42.4478C105.636 42.4478 103.53 41.5754 101.977 40.0226C100.425 38.4698 99.5522 36.3638 99.5522 34.1678C99.5522 31.9718 100.425 29.8658 101.977 28.313C103.53 26.7602 105.636 25.8878 107.832 25.8878Z">
                                        </path>
                                    </svg>
                                </a>

                                <a class="p-1 -m-1 text-gray-400 hover:text-amber-500 focus:outline-none focus-visible:ring-2 ring-primary"
                                    href="#" rel="noopener" aria-label="Ariel Cerda on Youtube" target="_blank">
                                    <svg class="w-6 h-6 overflow-visible fill-current" alt="" aria-hidden="true"
                                        viewBox="0 0 140 140">
                                        <path
                                            d="M115 15H25A25 25 0 000 40v60a25 25 0 0025 25h90a25 25 0 0025-25V40a25 25 0 00-25-25zM95.71 76.25L63.58 94.1A7.15 7.15 0 0153 87.85v-35.7a7.15 7.15 0 0110.6-6.26l32.11 17.86a7.15 7.15 0 010 12.5z">
                                        </path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pt-6 mx-6 mt-6 text-center border-t border-gray-200 dark:border-gray-700/50">
                    <div class="flex flex-wrap justify-center">
                        <div class="w-full px-6">
                            <p class="mb-4 font-light leading-relaxed text-gray-600 dark:text-gray-400">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin turpis orci, maximus sed
                                purus a, cursus scelerisque purus. Morbi molestie, odio at sagittis rhoncus, felis massa
                                iaculis mi, quis molestie erat ipsum vel risus.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="relative h-6 overflow-hidden translate-y-6 rounded-b-xl">
                    <div class="absolute flex -space-x-12 rounded-b-2xl">
                        <div
                            class="w-36 h-8 transition-colors duration-200 delay-75 transform skew-x-[35deg] bg-amber-400/90 group-hover:bg-amber-600/90 z-10">
                        </div>
                        <div
                            class="w-28 h-8 transition-colors duration-200 delay-100 transform skew-x-[35deg] bg-amber-300/90 group-hover:bg-amber-500/90 z-20">
                        </div>
                        <div
                            class="w-28 h-8 transition-colors duration-200 delay-150 transform skew-x-[35deg] bg-amber-200/90 group-hover:bg-amber-400/90 z-30">
                        </div>
                        <div
                            class="w-28 h-8 transition-colors duration-200 delay-200 transform skew-x-[35deg] bg-amber-100/90 group-hover:bg-amber-300/90 z-40">
                        </div>
                        <div
                            class="w-28 h-8 transition-colors duration-200 delay-300 transform skew-x-[35deg] bg-amber-50/90 group-hover:bg-amber-200/90 z-50">
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'ProfilePage'
}
</script>