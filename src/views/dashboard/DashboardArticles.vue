<script>
import { mapActions } from 'pinia';
import articleStore from '@/stores/articleStore';
import PaginationComponent from '@/components/PaginationComponent.vue';
import ArticleModal from '@/components/dashboard/modal/ArticleModal.vue'



import Swal from 'sweetalert2';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  components:{PaginationComponent, ArticleModal},
  data() {
    return {
      articles: [],
      tempArticle: {},
      isNew: true,
      page: {},
      isLoading:false,
    }
  },
  methods: {
    ...mapActions(articleStore,['getAllArticles']),
    async getArticles(page = 1) {
      this.isLoading = true;
      try {
        const res = await this.axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/admin/articles?page=${page}`);
        this.articles = res.data.articles;
        this.page = res.data.pagination;
      } catch (err) {
        Swal.fire({
          title: '錯誤發生',
          icon: 'error',
          text: `${err.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`,
        });
      } finally {
        this.isLoading = false;
      }
    },
    addNewArticle() {
      this.tempArticle = {};
      this.isNew = true;
    },
    editArticle(article) {
      this.tempArticle = { ...article };
      this.isNew = false;
    },
    deleteArticle(article) {
      Swal.fire({
        title: '確定要刪除嗎?',
        icon: 'warning',
        text: `確定要刪除${article.title}嗎?`,
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '確定',
        confirmButtonColor: 'hsl(0,85%,60%)',
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.isLoading = true;
          try {
            const res = await this.axios.delete(`${VITE_URL}/v2/api/${VITE_PATH}/admin/article/${article.id}`);
            Swal.fire({
              title:'刪除成功',
              icon: 'success',
              text:`${res.data.message}`,
              showConfirmButton: false,
              timer: 1000,
              didClose: () => {
                this.getArticles();
                this.getAllArticles();
              }
            })
          } catch (err) {
                        Swal.fire({
              title: '錯誤發生',
              icon: 'error',
              text: `${err.response.data.message}`,
            });
          } finally {
            this.isLoading = false;
          }
        }
      })
    }
  },
  mounted() {
    this.getArticles();
  }
}
</script>  

<template>
  <VLoading :active="isLoading" />
  <div class="py-4">
    <h2 class="h2 text-center">文章列表</h2>
    <div class="text-end mb-4">
      <button type="button" class="btn btn-themeDark" data-bs-toggle="modal" data-bs-target="#articleModal" @click="addNewArticle">建立文章</button>
    </div>
  </div>
  <!-- table -->
  <div class="table-responsive">
    <table class="table table-hover align-middle">
      <thead>
        <tr>
          <th scope="col">編號</th>
          <th scope="col">封面</th>
          <th scope="col">標題</th>
          <th scope="col">分類</th>
          <th scope="col">敘述</th>
          <th scope="col">作者</th>
          <th scope="col">日期</th>
          <th scope="col">狀態</th>
          <th scope="col">管理</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <th scope="row">{{ article.num }}</th>
          <td>
            <img :src="article.image" alt="articleImage">
          </td>
          <td>
            <p class="text-truncate article-title mb-0">{{ article.title }}</p>
          </td>
          <td>{{ article.category }}</td>
          <td>
            <p class="text-truncate article-description mb-0">
              {{ article.description }}
            </p>
          </td>
          <td>{{ article.author }}</td>
          <td>{{ $timeTransform(article.create_at) }}</td>
          <td>
            <span v-if="article.isPublic" class="text-themeDark">公開</span>
            <span v-else class="text-danger">隱藏</span>
          </td>
          <td>
            <button type="button" class="btn btn-outline-themeDark me-2" data-bs-toggle="modal" data-bs-target="#articleModal" @click="editArticle(article)">編輯</button>
            <button type="button" class="btn btn-outline-danger" @click="deleteArticle(article)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationComponent v-if="page.total_pages > 1" :pages="page" @get-Method="getArticles" />
    <ArticleModal :is-new="isNew" :temp-article="tempArticle" @get-articles="getArticles" />
  </div>
</template>

<style scoped lang="scss">
img{
  width: 100px;
  aspect-ratio: 1;
}
.article-title{
  width: 100px;
}
.article-description{
  width: 400px;
}
</style>