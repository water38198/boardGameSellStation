<script>
import articleStore from '@/stores/articleStore';
import { mapState, mapActions } from 'pinia';

export default {
  methods: {
    ...mapActions(articleStore, ['getAllArticles']),
  },
  computed: {
    ...mapState(articleStore, ['articleLoading']),
  },
  mounted() {
    this.getAllArticles();
  }
}
</script>

<template>
  <VLoading :active="articleLoading"/>
  <RouterView />
</template>


