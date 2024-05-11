<script>
import { mapState } from 'pinia';
import articleStore from '@/stores/articleStore';
import CategoryNavbar from '@/components/front/CategoryNavbar.vue';
import ArticleCard from '@/components/front/articles/ArticleCard.vue';
import ArticlesPagination from '@/components/front/articles/ArticlesPagination.vue';

export default {
  data() {
    return {
      randomPic: 'https://picsum.photos/100',
      pagination: {
        total_pages: 0,
        current_page: 1,
      },
      categoryList: ['全部', '新聞', '心得', '開箱'],
    };
  },
  computed: {
    ...mapState(articleStore, ['articles', 'articleLoading']),
    category() {
      return this.$route.query.category || '';
    },
    filteredArticles() {
      if (!this.category || this.category === '全部') return this.articles;
      return this.articles.filter((article) => article.category === this.category);
    },
    transformCategoryText() {
      if (this.category === '新聞') return '最新消息';
      if (this.category === '心得') return '心得分享';
      if (this.category === '開箱') return '開箱文章';
      return '全部文章';
    },
    currentPage() {
      return this.filteredArticles
        .slice((this.pagination.current_page - 1) * 10, this.pagination.current_page * 10);
    },
  },
  methods: {
    changeCategory(category) {
      this.$router.push(`/articles?category=${category}`);
    },
    changePage(page) {
      this.pagination.current_page = page;
      window.scrollTo(0, 0);
    },
  },
  components: {
    CategoryNavbar, ArticleCard, ArticlesPagination,
  },
  watch: {
    category(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$route.query.category = newValue;
      }
    },
    filteredArticles() {
      this.pagination.total_pages = Math.floor(this.filteredArticles.length / 10) + 1;
      this.pagination.current_page = 1;
    },
  },
};
</script>

<template>
  <div class="container bg-white article-container pt-100 pb-5">
    <div class="row g-3">
      <div class="col-lg-3">
        <!-- <ArticlesNavbar @change-category="changeCategory" :category="category"/> -->
        <CategoryNavbar @change-category="changeCategory" :category="category"
        :category-list="categoryList">
        <template #header>
          <h3 class="text-theme text-center h3">文章類別</h3>
        </template>
        </CategoryNavbar>
      </div>
      <div class="col-lg-9">
        <h2 class="fs-2 bg-theme py-4  ps-4 text-white mb-0 rounded-top">
          <i class="bi bi-card-list me-2"></i>{{ transformCategoryText }}
        </h2>
        <ol class="list-group list-group-flush">
          <template v-for="(article, index) in currentPage" :key="article.id">
            <ArticleCard :article="article" :index="index" />
          </template>
        </ol>
        <ArticlesPagination :pagination="pagination" @change-page="changePage"/>
      </div>
    </div>
  </div>
</template>
