<script>
import { RouterView } from 'vue-router';
import articleStore from '@/stores/articleStore';
import productStore from '@/stores/productStore';
import { mapState, mapActions } from 'pinia';

export default {
  methods: {
    ...mapActions(articleStore, ['getArticles']),
    ...mapActions(productStore, ['getProducts']),
  },
  computed: {
    ...mapState(articleStore, ['articleLoading']),
    ...mapState(productStore, ['productLoading']),
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
  <VLoading :active="articleLoading || productLoading" />
  <div>
    <RouterView />
  </div>
</template>
