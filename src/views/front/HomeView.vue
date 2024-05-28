
<script>
// store
import { mapState } from 'pinia';
import articleStore from '@/stores/articleStore';

import HeadBanner from '@/components/front/home/HeadBanner.vue';
import NewsList from '@/components/front/home/NewsList.vue';
import NewestProduct from '@/components/front/home/NewestProduct.vue';
import ArticleList from '@/components/front/home/ArticleList.vue';
import FAQ from '@/components/front/home/FAQ.vue';

export default {
  computed: {
    ...mapState(articleStore,['articles'])
  },
  methods: {
    filterArticles(category, number) {
      const array = [...this.articles];
      return array.filter((article) => article.category === category).slice(0, number);
    },
  },
  components:{ HeadBanner, NewsList, NewestProduct, ArticleList, FAQ},
}
</script>

<template>
  <div class="bg-gray200">
    <HeadBanner />
    <main>
      <NewsList :articles="articles.slice(0,5)" />
      <NewestProduct />
      <section class="article-banner">
        <div class="container text-center">
          <p class="text-white fs-2 mb-4">還在猶豫嗎?</p>
          <p class="text-white fs-2">看看我的心得與開箱吧!</p>
        </div>
      </section>
      <ArticleList :articles="filterArticles('心得', 3)" category="心得"/>
      <ArticleList :articles="filterArticles('開箱', 3)" category="開箱"/>    
      <FAQ />
    </main>
  </div>
</template>

<style scoped lang="scss">
.article-banner {
  background: {
    image: linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)), url(@/assets/images/front/homepage/section-image.jpg);
    position: center;
    size: cover;
  };
  padding-top: 100px;
  padding-bottom: 100px;
}
</style>