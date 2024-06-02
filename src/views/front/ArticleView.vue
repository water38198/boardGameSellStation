<script>
import Swal from 'sweetalert2';

import RandomProduct from '@/components/front/product/RandomProduct.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  components:{RandomProduct},
  data() {
    return {
      article: {},
      isLoading: false,
    }
  },
  methods: {
    async getArticle() {
      this.isLoading = true;
      try {
        const res = await this.axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/article/${this.$route.params.id}`);
        this.article = res.data.article;
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: '發生錯誤',
          text: '即將回到首頁，如果錯誤持續發生，請通知我們，感謝!!',
          didClose: () => {
            this.$router.push('/');
          },
        });
      } finally {
        this.isLoading = false;
      }
    }
  },
  mounted() {
    this.getArticle();
  }
}
</script>

<template>
  <div v-if="article.title" class="container bg-white pb-4 px-sm-5" >
    <VLoading :active="isLoading" />
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink to="/" class="link-theme">首頁</RouterLink>
        </li>
        <li class="breadcrumb-item">
          <RouterLink :to="`../articles?category=${article.category}`" class="link-theme">{{ article.category }}</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ article.title }}
        </li>
      </ol>
    </nav>
    <h2 class="h2">{{ article.title }}</h2>
      <div class="text-b60">
        <span class="me-4">日期: {{ this.$timeTransform(article.create_at) }}</span>
        <span>作者: {{ article.author }}</span>
    </div>
    <div class="my-4 text-center">
      <img :src="article.image" alt="article image"/>
    </div>
    <div v-html="article.content" class="mb-5"></div>
    <div class="text-center border-bottom pb-10 mb-10">
      <button type="button" class="btn btn-theme text-white" @click="this.$router.go(-1)">
        返回上一頁
      </button>
    </div>
    <RandomProduct />
  </div>
  <div v-else style="min-height: 500px;">
  </div>
</template>

<style scoped lang="scss">
@media (max-width: 375px) {
  .breadcrumb {
    font-size: 12px;
  }
}
img{
  max-height: 500px;
}
</style>