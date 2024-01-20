<template>
    <button @click="scrollToTop" v-show="isVisible" class="scroll-to-top">
        <i class="fas fa-arrow-up"></i>
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
    background-color: #fff;

    color: #860f0f;

    border: none;
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.scroll-to-top:hover {
    background-color: #e66363;
    color: #fff;

}
</style>