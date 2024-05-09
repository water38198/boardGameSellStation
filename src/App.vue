<script>
import { RouterView } from 'vue-router';
import articleStore from '@/stores/articleStore';
import { mapState, mapActions } from 'pinia';

export default {
  methods: {
    ...mapActions(articleStore, ['getArticles']),
  },
  computed: {
    ...mapState(articleStore, ['articleLoading']),
  },
  components: {
    RouterView,
  },
  mounted() {
    this.getArticles();
  },
};
</script>

<template>
  <VLoading :active="articleLoading" />
  <div>
    <RouterView />
  </div>
</template>
