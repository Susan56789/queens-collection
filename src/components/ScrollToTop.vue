<template>
    <button @click="scrollToTop" v-show="isVisible" class="scroll-to-top">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            viewBox="0 0 24 24">
            <path d="M19 14l-7-7-7 7"></path>
        </svg>
    </button>
</template>

<script>
export default {
    name: 'ScrollToTop',
    data() {
        return {
            isVisible: false,
        };
    },
    methods: {
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        },
        handleScroll() {
            this.isVisible = window.scrollY > 100;
        },
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
}
</script>

<style scoped>
.scroll-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #860f0f;

    color: #ffffff;

    border: none;
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.scroll-to-top:hover {
    background-color: #9b1919;

}
</style>