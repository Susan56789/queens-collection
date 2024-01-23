<template>
    <div>
        <div class="flex items-center justify-center p-12">
            <div class="mx-auto w-full max-w-[550px]">
                <form @submit.prevent="addProduct">
                    <label class="mb-3 block text-base font-medium text-red-500">
                        Product Name:
                        <input
                            class="w-full rounded-md border border-red-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-red-500 focus:shadow-md"
                            v-model="product.product_name" type="text" required />
                    </label>

                    <label class="mb-3 block text-base font-medium text-red-500">
                        Price:
                        <input
                            class="w-full rounded-md border border-red-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-red-500 focus:shadow-md"
                            v-model.number="product.price" type="number" step="0.01" required />
                    </label>

                    <label class="mb-3 block text-base font-medium text-red-500">
                        Sale Price:
                        <input
                            class="w-full rounded-md border border-red-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-red-500 focus:shadow-md"
                            v-model.number="product.sale_price" type="number" step="0.01" />
                    </label>

                    <label class="mb-3 block text-base font-medium text-red-500">
                        Image Path:
                        <input
                            class="w-full rounded-md border border-red-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-red-500 focus:shadow-md"
                            v-model="product.image_path" type="text" />
                    </label>

                    <label class="mb-3 block text-base font-medium text-red-500">
                        Color:
                        <input
                            class="w-full rounded-md border border-red-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-red-500 focus:shadow-md"
                            v-model="product.color" type="text" />
                    </label>

                    <label class="mb-3 block text-base font-medium text-red-500">
                        Product Size:
                        <input
                            class="w-full rounded-md border border-red-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-red-500 focus:shadow-md"
                            v-model="product.product_size" type="text" />
                    </label>

                    <label class="mb-3 block text-base font-medium text-red-500">
                        Short Description:
                        <textarea
                            class="w-full resize-none rounded-md border border-red-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-red-500 focus:shadow-md"
                            v-model="product.description"></textarea>
                    </label>

                    <label class="mb-3 block text-base font-medium text-red-500">
                        Category ID:
                        <input
                            class="w-full rounded-md border border-red-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-red-500 focus:shadow-md"
                            v-model.number="product.category_id" type="number" required />
                    </label>
                    <label class="mb-3 block text-base font-medium text-red-500">
                        Category Name:
                        <select class="w-full rounded-md border border-red-500 bg-white py-3 px-6 text-base font-medium
                             text-[#6B7280] outline-none focus:border-red-500 focus:shadow-md"
                            v-model="product.category_id" required>
                            <option value="" disabled>Select a category</option>
                            <option v-for="category in categories" :key="category.category_id"
                                :value="category.category_id">
                                {{ category.category_name }}
                            </option>
                        </select>
                    </label>
                    <button
                        class="hover:shadow-form rounded-md bg-red-500 py-3 px-8 text-base font-semibold text-white outline-none"
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
                                Image
                            </th>
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
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in latestProducts" :key="product.product_id">
                            <td class="px-5 py-5 border-b border-gray-200  text-sm">
                                <img :src="product.image_path" :alt="product.product_name" />
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200  text-sm">
                                {{ product.product_name }}
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200  text-sm">
                                {{ formatCurrency(product.price) }}
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200  text-sm">
                                {{ formatCurrency(product.sale_price) }}
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200  text-sm">
                                <a href="#" class="hover:red">View</a>
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
                price: null,
                sale_price: null,
                image_path: "",
                color: "",
                product_size: "",
                description: "",
                category_id: null,
            },
            latestProducts: [],
            categories: [],
        };
    },
    mounted() {
        this.fetchLatestProducts();
        this.fetchCategories();
    },
    methods: {
        formatCurrency(value) {
            const numericValue = parseFloat(value);
            return isNaN(numericValue) ? '-' : numericValue.toLocaleString('en-KE', { style: 'currency', currency: 'KES' });
        },
        async fetchCategories() {
            try {
                // Make an API request to fetch categories
                const response = await this.$axios.get('http://localhost:3000/api/categories');
                this.categories = response.data;
            } catch (error) {
                console.error('Error fetching categories', error);
            }
        },
        addProduct() {
            this.$axios.post("http://localhost:3000/api/products", this.product)
                .then(response => {
                    console.log("Product added successfully", response.data);
                    this.fetchLatestProducts();
                    // Reset the form data after successful submission
                    this.product = {
                        product_name: "",
                        price: null,
                        sale_price: null,
                        image_path: "",
                        color: "",
                        product_size: "",
                        description: "",
                        category_id: null,

                    };
                })
                .catch(error => {
                    console.error("Error adding product", error);
                });
        },
        async fetchLatestProducts() {
            try {
                const response = await axios.get("http://localhost:3000/api/products/latest");

                this.latestProducts = response.data || [];

            } catch (error) {
                console.error("Error fetching latest products", error);
            }
        },
    },
};
</script>
  

<style scoped>
img {
    width: 50px;
    height: 50px;
}
</style>