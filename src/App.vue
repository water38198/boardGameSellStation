<script>
import { RouterView } from 'vue-router';
import articleStore from '@/stores/articleStore';
import productStore from '@/stores/productStore';
import { mapActions } from 'pinia';

export default {
  methods: {
    ...mapActions(articleStore, ['getArticles']),
    ...mapActions(productStore, ['getProducts']),
  },
  components: {
    RouterView,
  },
  mounted() {
    this.getArticles();
    this.getProducts();
  },
};
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
