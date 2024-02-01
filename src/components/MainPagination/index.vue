<template>
    <nav>
        <ul class="flex">
            <li>
                <a class="pagination-link" href="#" aria-label="Previous" @click.prevent="goToPage(currentPage - 1)"
                    :disabled="currentPage === 1">
                    <span class="material-icons text-sm">keyboard_arrow_left</span>
                </a>
            </li>

            <!-- Generate pagination links dynamically -->
            <li v-for="page in totalPages" :key="page">
                <a class="pagination-link" href="#" @click.prevent="goToPage(page)"
                    :class="{ 'active': currentPage === page }">
                    {{ page }}
                </a>
            </li>

            <li>
                <a class="pagination-link" href="#" aria-label="Next" @click.prevent="goToPage(currentPage + 1)"
                    :disabled="currentPage === totalPages">
                    <span class="material-icons text-sm">keyboard_arrow_right</span>
                </a>
            </li>
        </ul>
    </nav>
</template>
  
<script>
export default {
    name: 'MainPagination',
    props: {
        currentPage: Number,
        totalPages: Number,
        goToPage: Function,
    },
};
</script>
  
<style scoped>
nav {
    margin-top: 30px;
}

.pagination-link {
    display: flex;
    height: 2.25rem;
    width: 2.25rem;
    align-items: center;
    justify-content: center;
    border: 1px solid #CBD5E0;
    background: transparent;
    padding: 0;
    margin: 0 0.25rem;
    font-size: 0.875rem;
    color: #4A5568;
    transition: background-color 0.3s ease-in-out;
}

.pagination-link:hover {
    background-color: #E2E8F0;
}

.pagination-link.active {
    background-color: #da1818;
    color: #ffffff;
}
</style>
  