<script>
import { mapActions } from 'pinia';
import utilities from '@/stores/utilities';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      category: '全部',
      randomPic: 'https://picsum.photos/100',
      articles: [],
      pagination: {
        total_pages: 0,
        current_page: 1,
      },
      isLoading: false,
    };
  },
  computed: {
    filteredArticles() {
      if (this.category === '全部') return this.articles;
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
      this.category = category;
      this.$router.push(`/articles?category=${category}`);
    },
    getArticles(page = 1) {
      this.isLoading = true;
      const { VITE_URL, VITE_PATH } = import.meta.env;
      this.$http.get(`${VITE_URL}/v2/api/${VITE_PATH}/articles?page=${page}`)
        .then((res) => {
          // 因為沒辦法使用 all 與 category 所以先把全部文章抓出
          this.articles = this.articles.concat(res.data.articles);
          if (
            res.data.pagination.total_pages > 1
            && res.data.pagination.current_page < res.data.pagination.total_pages
          ) {
            this.getArticles(page + 1);
          }
        })
        .catch((err) => {
          Swal.fire({
            title: '錯誤發生',
            icon: 'error',
            text: `${err.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`,
          });
        }).finally(() => {
          this.isLoading = false;
        });
    },
    changePage(page) {
      this.pagination.current_page = page;
      window.scrollTo(0, 0);
    },
    ...mapActions(utilities, ['timeTransform']),
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
  mounted() {
    this.getArticles();
    this.category = this.$route.query.category;
  },
};
</script>

<template>
  <VLoading :active="isLoading"/>
  <div class="container bg-white article-container">
    <div class="row g-3">
      <div class="col-lg-3 col-xl-2 mt-0 mt-xl-3">
        <div
          class="list-group text-center flex-row flex-lg-column list-group-flush article-list-group"
          style="position: sticky; top: 90px"
        >
          <button
            type="button"
            class="list-group-item list-group-item-action"
            :class="{'active':category ==='全部'}"
            aria-current="true"
            data-bs-toggle="list"
            @click="changeCategory('全部')"
            id="all"
          >
          <span class="d-none d-sm-block">全部文章</span>
          <span class="d-sm-none">全部</span>
          </button>
          <button
            type="button"
            class="list-group-item list-group-item-action"
            :class="{'active':category ==='新聞'}"
            data-bs-toggle="list"
            @click="changeCategory('新聞')"
            id="news"
          >
          <span class="d-none d-sm-block">最新消息</span>
          <span class="d-sm-none">新聞</span>
          </button>
          <button
            type="button"
            class="list-group-item list-group-item-action"
            :class="{'active':category ==='心得'}"
            data-bs-toggle="list"
            @click="changeCategory('心得')"
            id="reviews"
          >
          <span class="d-none d-sm-block">心得分享</span>
          <span class="d-sm-none">心得</span>
          </button>
          <button
            type="button"
            class="list-group-item list-group-item-action"
            :class="{'active':category ==='開箱'}"
            data-bs-toggle="list"
            @click="changeCategory('開箱')"
            id="unboxings">
          <span class="d-none d-sm-block">開箱文章</span>
          <span class="d-sm-none">開箱</span>
          </button>
        </div>
      </div>
      <div class="col-lg-9 col-xl-10">
        <h2 class="fs-2 bg-theme py-4 py-md-7 ps-4 text-white mb-0 rounded-top">
          <i class="bi bi-card-list me-2"></i>{{ transformCategoryText }}
        </h2>
        <ol class="list-group list-group-flush">
          <li
            v-for="(article, index) in currentPage"
            :key="article.id"
            class="list-group-item d-flex px-0 px-sm-4 py-4 align-items-center"
          >
            <span
              class="me-4 bg-theme text-white fw-bold"
              style="font-size: 80%; padding: 3px 8px; border-radius: 3px"
              >{{ index + 1 }}</span
            >
            <RouterLink
              :to="`../article/${article.id}`"
              class="d-flex align-items-center link-dark text-decoration-none link-hover"
              style="height: 100px; min-width: 0"
            >
              <div class="position-relative link-image">
                <img
                  :src="article.image"
                  alt="article image"
                  style="width: 100px; height: 100px; object-fit: cover"
                  class="rounded-3"
                  onerror="this.onerror=null;this.src='/src/assets/no_image_icon.png'"
                />
              </div>
              <div class="ms-3" style="flex: 1; min-width: 0">
                <h3 class="fs-4 text-truncate">{{ article.title }}</h3>
                <span class="text-b60">{{
                  timeTransform(article.create_at)
                }}</span>
                <p class="mb-0 text-truncate">{{ article.description }}</p>
              </div>
            </RouterLink>
          </li>
        </ol>
        <nav aria-label="Page navigation" class="mt-5"
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
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.article-container{
  padding-top: 100px;
  padding-bottom: 0px;
}

@media (min-width: 576px) {
  .article-container{
    padding-bottom: 80px;

  }
}
.link-hover:hover h3 {
  text-decoration: underline;
  color: #0fb99b;
}
/* 圖片hover時變暗 */
.link-hover .link-image:before {
  content: "";
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 8px;
}
.link-hover:hover .link-image:before {
  background-color: rgba(0, 0, 0, 0.3);
}
/* 圖片hover時變暗 */
button.list-group-item.active {
  color: white;
}
.article-list-group {
  font-size: 1.25rem;
}
.list-group-flush > .list-group-item:last-child {
  border-bottom: var(--bs-list-group-border-width) solid
    var(--bs-list-group-border-color);
}

@media (min-width: 768px) {
  .article-list-group {
    font-size: 1.5rem;
  }
}
</style>
