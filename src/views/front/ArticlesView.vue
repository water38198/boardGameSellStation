<script>
import { mapState } from 'pinia';
import articleStore from '@/stores/articleStore';
import ArticlesNavbar from '@/components/front/articles/ArticlesNavbar.vue';
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
  components: { ArticlesNavbar, ArticleCard, ArticlesPagination },
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
        <ArticlesNavbar @change-category="changeCategory" :category="category"/>
      </div>
      <div class="col-lg-9">
        <h2 class="fs-2 bg-theme py-4 py-md-7 ps-4 text-white mb-0 rounded-top">
          <i class="bi bi-card-list me-2"></i>{{ transformCategoryText }}
        </h2>
        <ol class="list-group list-group-flush">
          <template v-for="(article, index) in currentPage" :key="article.id">
            <ArticleCard :article="article" :index="index" />
          </template>
        </ol>
        <ArticlesPagination :pagination="pagination" @change-page="changePage"/>
        <!-- <nav aria-label="Page navigation" class="mt-5"
          v-if="pagination.total_pages > 1"
        >
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: pagination.current_page === 1 }">
              <a
                class="page-link"
                href="#"
                aria-label="Previous"
                @click.prevent="changePage(pagination.current_page - 1)"
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li
              class="page-item"
              :class="{
                active: page === pagination.current_page,
              }"
              v-for="page in pagination.total_pages"
              :key="page + 'page'"
            >
              <a class="page-link" href="#" @click.prevent="changePage(page)">{{
                page
              }}</a>
            </li>
            <li class="page-item"
            :class="{ disabled: pagination.current_page === pagination.total_pages }">
              <a
                class="page-link"
                href="#"
                aria-label="Next"
                @click.prevent="changePage(pagination.current_page + 1)"
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav> -->
      </div>
    </div>
  </div>
</template>
