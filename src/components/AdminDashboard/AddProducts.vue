<template>
    <div>
        <div class="flex items-center justify-center p-12">
            <div class="mx-auto w-full max-w-[550px]">
                <form @submit.prevent="addProduct">
                    <label class="mb-3 block text-base font-medium text-[#07074D]">
                        Product Name:
                        <input
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            v-model="product.product_name" type="text" required />
                    </label>

                    <label class="mb-3 block text-base font-medium text-[#07074D]">
                        Price:
                        <input
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            v-model.number="product.price" type="number" step="0.01" required />
                    </label>

                    <label class="mb-3 block text-base font-medium text-[#07074D]">
                        Sale Price:
                        <input
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            v-model.number="product.sale_price" type="number" step="0.01" />
                    </label>

                    <label class="mb-3 block text-base font-medium text-[#07074D]">
                        Image Path:
                        <input
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            v-model="product.image_path" type="text" />
                    </label>

                    <label class="mb-3 block text-base font-medium text-[#07074D]">
                        Color:
                        <input
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            v-model="product.color" type="text" />
                    </label>

                    <label class="mb-3 block text-base font-medium text-[#07074D]">
                        Product Size:
                        <input
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            v-model="product.product_size" type="text" />
                    </label>

                    <label class="mb-3 block text-base font-medium text-[#07074D]">
                        Description:
                        <textarea
                            class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            v-model="product.description"></textarea>
                    </label>

                    <label class="mb-3 block text-base font-medium text-[#07074D]">
                        Category ID:
                        <input
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            v-model.number="product.category_id" type="number" required />
                    </label>

                    <button
                        class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
                        type="submit">Add Product</button>
                </form>
            </div>
        </div>

        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">

                <h2 class="flex flex-row flex-nowrap items-center my-8">
                    <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                    <span
                        class="flex-none block mx-4   px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
                        Latest Products
                    </span>
                    <span class="flex-grow block border-t border-black" aria-hidden="true" role="presentation"></span>
                </h2>
                <table class="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Product Name
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Product Price
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Sale Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in latestProducts" :key="product.product_id">
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                {{ product.product_name }}
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                {{ product.price }}
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                {{ product.sale_price }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    name: 'NewProducts',
    data() {
        return {
            product: {
                product_name: "",
                price: 0,
                sale_price: 0,
                image_path: "",
                color: "",
                product_size: "",
                description: "",
                category_id: 1,
            },
            latestProducts: [],
        };
    },
    mounted() {
        this.fetchLatestProducts();
    },
    methods: {
        addProduct() {
            this.$axios.post("/api/products", this.product)
                .then(response => {
                    console.log("Product added successfully", response.data);
                    this.fetchLatestProducts();
                })
                .catch(error => {
                    console.error("Error adding product", error);
                });
        },
        async fetchLatestProducts() {
            try {
                const response = await axios.get("/api/products/latest");
                this.latestProducts = response.data || [];

            } catch (error) {
                console.error("Error fetching latest products", error);
            }
        },
    },
};
</script>
  