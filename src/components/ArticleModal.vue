<script>
import Swal from "sweetalert2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  props: ["tempArticleId", "isNew", "closeModal", "getArticles"],
  data() {
    return {
      newArticle: {
        isPublic: false,
      },
      loadingItem: "",
      isLoading: false,
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ["heading", "|", "bold", "italic", "link"],
      },
    };
  },
  methods: {
    updateArticle() {
      this.loadingItem = "confirmButton";
      this.isLoading = true;
      let method = "post";
      let apiUrl = `${VITE_URL}/v2/api/${VITE_PATH}/admin/article`;
      if (!this.isNew) {
        apiUrl += `/${this.tempArticleId}`;
        method = "put";
      } else {
        this.newArticle.create_at = new Date().getTime();
      }
      this.$http[method](apiUrl, {
        data: this.newArticle,
      })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: `${method === "put" ? "修改成功" : "新增成功"}`,
            showConfirmButton: false,
            timer: 1500,
            didClose: () => {
              this.closeModal();
              this.getArticles();
              this.isLoading = false;
            },
          });
        })
        .catch((err) => {
          alert(err);
        })
        .finally(() => {
          this.loadingItem = "";
        });
    },
    uploadImage() {
      let file = document.querySelector("#uploadImage");
      this.loadingItem = "uploadImage";
      const formData = new FormData();
      formData.append("file-to-upload", file.files[0]);
      this.$http
        .post(`${VITE_URL}/v2/api/${VITE_PATH}/admin/upload`, formData)
        .then((res) => {
          if (!res.data.imageUrl) {
            alert(res.data.message);
          } else {
            this.newArticle.image = res.data.imageUrl;
          }
          this.loadingItem = "";
          file.value = "";
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  watch: {
    tempArticleId() {
      if (this.isNew) {
        this.newArticle = {
          isPublic: false,
        };
        return;
      }
      this.isLoading = true;
      this.$http
        .get(
          `${VITE_URL}/v2/api/${VITE_PATH}/admin/article/${this.tempArticleId}`
        )
        .then((res) => {
          this.newArticle = res.data.article;
          this.isLoading = false;
        });
    },
  },
};
</script>

<template>
  <div
    class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable"
  >
    <div class="modal-content vl-parent">
      <VLoading
        v-model:active="isLoading"
        :can-cancel="false"
        :is-full-page="false"
      />
      <div class="modal-header bg-light">
        <h5 class="modal-title" id="articleModalLabel">
          <span v-if="isNew">新增文章</span>
          <span v-else>編輯文章</span>
        </h5>
        <button
          type="button"
          class="btn-close"
          @click="closeModal()"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <VForm
          @submit="updateArticle()"
          v-slot="{ errors }"
          class="row"
          id="articleForm"
        >
          <div class="col-4">
            <div class="mb-5">
              <label for="image" class="form-label">封面</label>
              <input
                type="text"
                placeholder="請輸入圖片連結"
                id="image"
                class="form-control mb-2"
                v-model="newArticle.image"
              />
              <div class="mb-3">
                <input
                  class="form-control"
                  type="file"
                  id="uploadImage"
                  @change="uploadImage()"
                  :disabled="loadingItem === 'uploadImage'"
                />
              </div>
              <div class="text-center">
                <img
                  :src="newArticle.image"
                  alt="article image"
                  class="img-fluid articleCover"
                />
              </div>
            </div>
          </div>
          <div class="col-8">
            <div class="row gy-3">
              <div class="col-6">
                <label for="articleTitle" class="form-label">文章標題:</label>
                <VField
                  id="articleTitle"
                  name="文章標題"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['文章標題'] }"
                  placeholder="請輸入 文章標題"
                  rules="required"
                  v-model="newArticle.title"
                ></VField>
                <ErrorMessage
                  name="文章標題"
                  class="invalid-feedback"
                ></ErrorMessage>
              </div>
              <div class="col-6">
                <label for="articleCategory" class="form-label"
                  >文章分類:</label
                >
                <VField
                  id="articleCategory"
                  name="文章分類"
                  class="form-select"
                  :class="{ 'is-invalid': errors['文章分類'] }"
                  placeholder="請輸入 文章分類"
                  rules="required"
                  v-model="newArticle.category"
                  as="select"
                >
                  <option value="新聞">新聞</option>
                  <option value="心得">心得</option>
                  <option value="開箱">開箱</option>
                </VField>
                <ErrorMessage
                  name="文章分類"
                  class="invalid-feedback"
                ></ErrorMessage>
              </div>
              <div class="col-4">
                <label for="articleAuthor" class="form-label">作者:</label>
                <VField
                  id="articleAuthor"
                  name="作者"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['作者'] }"
                  placeholder="請輸入 作者"
                  rules="required"
                  v-model="newArticle.author"
                ></VField>
                <ErrorMessage
                  name="作者"
                  class="invalid-feedback"
                ></ErrorMessage>
              </div>
              <div class="col-8">
                <label for="articleDescription" class="form-label">敘述:</label>
                <VField
                  id="articleDescription"
                  name="敘述"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['敘述'] }"
                  placeholder="請簡單描述本文目的"
                  v-model="newArticle.description"
                ></VField>
                <ErrorMessage
                  name="敘述"
                  class="invalid-feedback"
                ></ErrorMessage>
              </div>
              <div class="col-4">
                <h5 class="h5">狀態:</h5>
                <div class="form-check form-switch d-flex align-items-center">
                  <input
                    class="form-check-input me-2"
                    type="checkbox"
                    role="switch"
                    id="isPublic"
                    v-model="newArticle.isPublic"
                  />
                  <label
                    class="form-check-label fs-5 text-primary"
                    for="isPublic"
                    v-if="newArticle.isPublic"
                    >公開</label
                  >
                  <label
                    class="form-check-label fs-5 text-secondary"
                    for="isPublic"
                    v-else
                    >隱藏</label
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <ckeditor
              :editor="editor"
              v-model="newArticle.content"
              :config="editorConfig"
            ></ckeditor>
          </div>
        </VForm>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="closeModal">
          取消
        </button>
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="loadingItem === 'confirmButton'"
          form="articleForm"
        >
          確認
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.articleCover {
  max-height: 250px;
}
</style>
