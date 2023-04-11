<template>
  <!-- Loading Layout -->
  <div class="vl-parent">
    <VLoading
      v-model:active="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    ></VLoading>
  </div>
  <h2 class="h2 text-center">文章管理</h2>
  <div class="text-end">
    <button type="button" class="btn btn-primary" @click="openModal('new')">
      建立文章
    </button>
  </div>
  <template v-if="articles">
    <table class="table align-middle">
      <thead>
        <tr>
          <th scope="col">編號</th>
          <th scope="col">封面</th>
          <th scope="col">標題</th>
          <th scope="col">分類</th>
          <th scope="col">描述</th>
          <th scope="col">作者</th>
          <th scope="col">日期</th>
          <th scope="col">狀態</th>
          <th scope="col">管理</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.key">
          <th scope="row">{{ article.num }}</th>
          <td>
            <img
              :src="article.image"
              alt="articleImage"
              @error="defaultSrc"
              class="article-image"
            />
          </td>
          <td>{{ article.title }}</td>
          <td>{{ article.category }}</td>
          <td>
            <p class="text-truncate" style="width: 200px">
              {{ article.description }}
            </p>
          </td>
          <td>{{ article.author }}</td>
          <td>{{ timeTransform(article.create_at) }}</td>
          <td>
            <span v-if="article.isPublic" class="text-success">公開</span>
            <span v-else class="text-danger">隱藏</span>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-sm btn-outline-primary me-2"
              @click="openModal('edit', article.id)"
            >
              修改
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-danger"
              @click="deleteArticle(article.id)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationComponent
      :pages="page"
      :get-Method="getArticles"
    ></PaginationComponent>
    <!-- ArticleModal -->
    <div
      class="modal fade"
      id="articleModal"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="articleModalLabel"
      aria-hidden="true"
    >
      <ArticleModal
        :temp-Article-Id="tempArticleId"
        :is-new="isNew"
        :close-Modal="closeModal"
        :get-Articles="getArticles"
      ></ArticleModal>
    </div>
  </template>
</template>

<script>
import PaginationComponent from "../../components/PaginationComponent.vue";
import ArticleModal from "../../components/ArticleModal.vue";
import { mapActions } from "pinia";
import utilities from "../../stores/utilities";
import Swal from "sweetalert2";
import notFound from "@/assets/image-not-found.svg";
import * as bootstrap from "bootstrap";
const { VITE_URL, VITE_PATH } = import.meta.env;
let articleModal = {};

export default {
  data() {
    return {
      articles: [],
      page: {},
      isLoading: false,
      isNew: true,
      tempArticleId: "",
      notFound: notFound,
    };
  },
  methods: {
    defaultSrc(event) {
      const img = event.srcElement;
      img.src = notFound;
      img.onerror = null;
    },
    getArticles(page = 1) {
      this.isLoading = true;
      this.$http
        .get(`${VITE_URL}/v2/api/${VITE_PATH}/admin/articles?page=${page}`)
        .then((res) => {
          this.articles = res.data.articles;
          this.page = res.data.pagination;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    deleteArticle(id) {
      Swal.fire({
        title: `確定刪除嗎?`,
        text: "刪除後不可復原，確定嗎",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "確定",
        cancelButtonColor: "#d33",
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.isConfirmed) {
          this.isLoading = true;
          this.$http
            .delete(`${VITE_URL}/v2/api/${VITE_PATH}/admin/article/${id}`)
            .then(() => {
              this.isLoading = false;
              Swal.fire({
                icon: "success",
                title: `文章刪除成功`,
                showConfirmButton: false,
                timer: 1000,
                didClose: () => {
                  this.getArticles();
                },
              });
            });
        }
      });
    },
    openModal(status, articleId) {
      if (status === "new") {
        this.isNew = true;
        articleModal.show();
      } else if (status === "edit") {
        this.isNew = false;
        this.tempArticleId = articleId;
        articleModal.show();
      }
    },
    closeModal() {
      this.tempArticleId = "";
      this.isNew = true;
      articleModal.hide();
    },
    ...mapActions(utilities, ["timeTransform"]),
  },
  mounted() {
    const myToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("myToken="))
      ?.split("=")[1];
    this.$http.defaults.headers.common["Authorization"] = myToken;

    articleModal = new bootstrap.Modal("#articleModal");
    articleModal._element.addEventListener("hidden.bs.modal", () => {
      this.tempArticleId = "";
      this.isNew = true;
    });
    this.getArticles();
  },
  components: { PaginationComponent, ArticleModal },
};
</script>
<style>
.article-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
</style>
