<script>
import { mapActions } from 'pinia';
import utilities from '@/stores/utilities';
import Swal from 'sweetalert2';

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
          Swal.fire({
            icon: 'error',
            title: '發生錯誤',
            text: '即將回到首頁，如果錯誤持續發生，請通知我們，感謝!!',
            didClose: () => {
              this.$router.push('/');
            },
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    ...mapActions(utilities, ['timeTransform']),
  },
  mounted() {
    this.getArticle();
  },
};
</script>

<template>
  <VLoading v-model:active="isLoading" :can-cancel="false" :is-full-page="true">
  </VLoading>
  <div class="container bg-white pt-100 pb-4 px-sm-5" v-if="article.title">
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink to="/" class="link-theme">首頁</RouterLink>
        </li>
        <li class="breadcrumb-item">
          <RouterLink
            :to="`../articles?category=${article.category}`"
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
      <img :src="article.image" alt="article image"/>
    </div>
    <div v-html="article.content" class="mb-5"></div>
    <div class="text-center">
      <button type="button" class="btn btn-theme text-white" @click="this.$router.go(-1)">
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
img{
  max-height: 500px;
}
</style>
