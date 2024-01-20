<template>
    <!-- component -->
    <div class="py-16 bg-white">
        <div class="container m-auto px-6 space-y-8 text-gray-500 md:px-12 lg:px-20">
            <div class="justify-center text-center gap-6 md:text-left md:flex lg:items-center  lg:gap-16">
                <div class="order-last mb-6 space-y-6 md:mb-0 md:w-6/12 lg:w-6/12">
                    <h1 class="text-4xl text-gray-700 font-bold md:text-5xl">Buy now and benefit up to <span
                            class="text-red-500">30% off</span></h1>
                    <p class="text-lg">Welcome to your go-to destination for curated fashion, exceptional quality, and a
                        seamless shopping experience. At Queen's Collection, we pride ourselves on offering a diverse range
                        of
                        products that cater to your unique style, whether you're seeking timeless classics, on-trend pieces,
                        or versatile essentials. Join us on a journey where fashion meets convenience, and every purchase is
                        an opportunity to express your individuality.
                    </p>
                    <div class="flex flex-row-reverse flex-wrap justify-center gap-4 md:gap-6 md:justify-end">
                        <a href="/shop" type="button" title="Start buying"
                            class="w-full py-3 px-6 text-center rounded-xl transition bg-gray-700 shadow-xl hover:bg-gray-600 active:bg-gray-700 focus:bg-gray-600 sm:w-max">
                            <span class="block text-white font-semibold">
                                Start buying
                            </span>
                        </a>

                    </div>
                </div>
                <div class="grid grid-cols-5 grid-rows-4 gap-4 md:w-5/12 lg:w-6/12">
                    <div class="col-span-2 row-span-4">
                        <img src="/images/greybag.jpg" class="rounded-full" width="640" height="960" alt="greybag"
                            loading="lazy">
                    </div>
                    <div class="col-span-2 row-span-2">
                        <img src="/images/whiteorangenike.jpg" class="w-full h-full object-cover object-top rounded-xl"
                            width="640" height="640" alt="nikeshoe" loading="lazy">
                    </div>
                    <div class="col-span-3 row-span-3">
                        <img src="/images/ladyinbrown.webp" class="w-full h-full object-cover object-top rounded-xl"
                            width="640" height="427" alt="ladyinbrown" loading="lazy">
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <!-- Mission Card -->
            <div class="bg-white p-6 rounded-lg shadow-lg">
                <h2 class="text-2xl font-bold mb-4">Mission Statement</h2>
                <p class="text-gray-700">
                    At Queen's Selection, our mission is to empower individuals to express
                    their unique style and confidence through a seamless fusion of Vue.js
                    technology and Tailwind CSS aesthetics. We are committed to curating a
                    diverse selection of fashion-forward choices that inspire and elevate
                    the way our customers present themselves to the world.
                </p>
            </div>

            <!-- Vision Card -->
            <div class="bg-white p-6 rounded-lg shadow-lg">
                <h2 class="text-2xl font-bold mb-4">Vision Statement</h2>
                <p class="text-gray-700">
                    Queen's Selection envisions a future where fashion is a powerful form
                    of self-expression, effortlessly accessible to everyone. Through the
                    lens of Vue.js interactivity and the sleek design principles of
                    Tailwind CSS, we aim to be a trendsetter in the online fashion industry.
                    Our vision is to continuously evolve and innovate, leveraging
                    cutting-edge technologies to redefine the online shopping experience.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AboutUs'
}
</script>