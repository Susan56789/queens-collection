<template>
  <div class="pagination">
    <button v-if="currentPage > 1" @click="paginate(currentPage - 1)">Previous</button>
    <button v-for="page in totalPages" :key="page" @click="paginate(page)" :class="{ active: page === currentPage }">{{
      page }}</button>
    <button v-if="currentPage < totalPages" @click="paginate(currentPage + 1)">Next</button>
  </div>
</template>
  
<script>
export default {
  name: 'PaginationPage',
  props: {
    totalPages: Number
  },
  data() {
    return {
      currentPage: 1
    };
  },
  methods: {
    paginate(page) {
      this.currentPage = page;
      this.$emit('paginate', page);
    }
  }
};
</script>
  
<style scoped>
.pagination {
  margin-top: 20px;
}

.pagination button {
  margin-right: 5px;
}

.pagination button.active {
  font-weight: bold;
}
</style>