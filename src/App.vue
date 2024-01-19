<template>
  <div id="app">
    <div v-if="isLoading" class="loading-indicator"></div>
    <router-view />
    <ScrollToTop />
  </div>
</template>

<script>
import ScrollToTop from './components/ScrollToTop.vue';

export default {
  name: 'App',
  components: {
    ScrollToTop,
  },
  computed: {
    isLoading() {
      return this.$router.isLoading;
    },
  },
}
</script>

<style>
.loading-indicator {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}</style>
