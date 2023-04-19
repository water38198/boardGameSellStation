<script>
import { mapActions } from "pinia";
import utilities from "@/stores/utilities";

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      article: {},
      isLoading: false,
    };
  },
  methods: {
    getArticle() {
      this.isLoading = true;
      this.$http
        .get(`${VITE_URL}/v2/api/${VITE_PATH}/article/${this.$route.params.id}`)
        .then((res) => {
          this.article = res.data.article;
        })
        .catch(() => {
          alert("錯誤發生");
          this.$router.go(-1);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    breadCrumbSort(category) {
      switch (category) {
        case "新聞":
          return "news";
        case "心得":
          return "reviews";
        case "開箱":
          return "unboxings";
      }
    },
    ...mapActions(utilities, ["timeTransform"]),
  },
  mounted() {
    this.getArticle();
  },
};
</script>

<template>
  <VLoading v-model:active="isLoading" :can-cancel="false" :is-full-page="true">
  </VLoading>
  <div class="container bg-white py-4  px-sm-5" v-if="article.title">
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink to="/" class="link-theme">首頁</RouterLink>
        </li>
        <li class="breadcrumb-item">
          <RouterLink
            :to="`../articles/${breadCrumbSort(article.category)}`"
            class="link-theme"
            >{{ article.category }}</RouterLink
          >
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ article.title }}
        </li>
      </ol>
    </nav>
    <h2 class="h2">{{ article.title }}</h2>
    <div class="text-b60">
      <span class="me-4">日期: {{ timeTransform(article.create_at) }}</span>
      <span>作者: {{ article.author }}</span>
    </div>
    <div class="my-4 text-center">
      <img
        :src="article.image"
        alt="article image"
        class="w-50"
        style="max-height: 500px; object-fit: cover"
      />
    </div>
    <div v-html="article.content" class="mb-5"></div>
    <div class="text-center">
      <button type="button" class="btn btn-theme" @click="this.$router.go(-1)">
        返回上一頁
      </button>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 375px) {
  .breadcrumb {
    font-size: 12px;
  }
}
</style>
