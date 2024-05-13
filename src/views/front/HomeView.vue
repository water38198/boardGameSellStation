<script>
// store
import { mapState } from 'pinia';
import articleStore from '@/stores/articleStore';
// 元件
import HeadBanner from '@/components/front/home/HeadBanner.vue';
import NewsList from '@/components/front/home/NewsList.vue';
import NewestProduct from '@/components/front/home/NewestProduct.vue';
import ArticleList from '@/components/front/home/ArticleList.vue';
import FAQ from '@/components/front/home/FAQ.vue';
// composables
import useTimeTransform from '@/composables/useTimeTransform';

export default {
  setup() {
    const { timeTransform } = useTimeTransform();
    return {
      timeTransform,
    };
  },
  methods: {
    filterArticles(category, number) {
      const array = [...this.articles];
      return array
        .filter((article) => article.category === category)
        .slice(0, number);
    },
  },
  computed: {
    ...mapState(articleStore, ['articles']),
  },
  components: {
    HeadBanner,
    NewsList,
    ArticleList,
    FAQ,
    NewestProduct,
  },
};
</script>

<template>
  <div class="bg-b20">
    <HeadBanner />
    <main>
      <!-- 新聞列表 -->
      <NewsList :articles="filterArticles('新聞', 5)" />
      <!-- 最新上架 -->
      <NewestProduct/>
      <section class="article-banner">
        <div class="container text-center">
          <p class="text-white fs-2 mb-4">還在猶豫嗎?</p>
          <p class="text-white fs-2">看看我的心得與開箱吧!</p>
        </div>
      </section>
      <!-- 文章列表:心得、開箱 -->
      <ArticleList :articles="filterArticles('心得', 3)" category="心得"/>
      <ArticleList :articles="filterArticles('開箱', 3)" category="開箱"/>
      <!-- FAQ -->
      <FAQ />
    </main>
  </div>
</template>

<style scoped lang="scss">
.article-banner {
  background: {
    image: url(@/assets/home/section-image.jpg);
    color: rgba(0, 0, 0, 0.6);
    blend-mode: multiply;
    position: center;
    size: cover;
  };
  padding-top: 100px;
  padding-bottom: 100px;
}
</style>
