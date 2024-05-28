<script>
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';

import CKEditor from '@ckeditor/ckeditor5-vue';
import Editor from 'ckeditor5-custom-build/build/ckeditor';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  props: {
    isNew: {
      type: Boolean,
    },
    tempArticle: {
      type: Object,
    }
  },
  components:{ckeditor:CKEditor.component},
  data() {
    return {
      modalArticle: {},
      isLoading: false,
      imageLoading: false,
      modal: null,
      editor: Editor,
      editorConfig:{},
    }
  },
  methods: {
    async getArticle() {
      this.isLoading = true;
      try {
        const res = await this.axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/admin/article/${this.tempArticle.id}`);
        this.modalArticle = res.data.article; 
      } catch (err) {
        console.log(err);
        Swal.fire({
          title: '錯誤發生',
          icon: 'error',
          text: `${err.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`,
        });
      } finally {
        this.isLoading = false;
      };
    },
    async updateArticle() {
      this.isLoading = true;
      const method = this.isNew ? 'post' : 'put';
      const apiUrl = this.isNew ? `${VITE_URL}/v2/api/${VITE_PATH}/admin/article` : `${VITE_URL}/v2/api/${VITE_PATH}/admin/article/${this.tempArticle.id}`;
      if (this.isNew) this.modalArticle.create_at = Date.now();
      try {
        const res = await this.axios[method](apiUrl, {
          data: this.modalArticle,
        });
        Swal.fire({
          title: `${res.data.message}`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          didClose: () => { 
            this.$emit('getArticles');
            this.modal.hide();
          }
        })
      } catch (err) {
        Swal.fire({
          title: '錯誤發生',
          icon: 'error',
          text: `${err.response.data.message}`,
        })
      } finally {
        this.isLoading = false;
      }
    },
    async uploadImage(e) {
      this.isLoading = true;
      const file = e.target;
      const formData = new FormData();
      formData.append('file-to-upload', file.files[0]);
      try {
        const res = await this.axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/admin/upload`, formData);
        console.log(res)
        if (!res.data.success) {
          Swal.fire({
            title: '錯誤發生',
            icon: 'error',
            text: '請重新嘗試，如果此狀況持續發生，請聯絡我們',
          });
        } else {
          this.modalArticle.image = res.data.imageUrl;
        }
      } catch (err) {
        Swal.fire({
          title: '錯誤發生',
          icon: 'error',
          text: `${err.response.data.message}`,
        });
      } finally {
        this.isLoading = false;
        file.value = '';
      }
    }
  },
  watch: {
    tempArticle() {
      this.modalArticle = { ...this.tempArticle };
      if (this.isNew) {
        this.modalArticle.isPublic = false;
        this.modalArticle.create_at = Math.floor(Date.now() / 1000);
      } else {
        this.getArticle();
      }
    }
  },
  mounted() {
    this.modal = new bootstrap.Modal('#articleModal');
  },
}
</script>

<template>
  <div class="modal fade" id="articleModal" data-bs-keyboard="false" tabindex="-1" aria-labelledby="articleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header bg-light">
          <h2 class="modal-title fs-4" id="articleModalLabel">
            <span v-if="isNew">新增文章</span>
            <span v-else>編輯文章</span>
          </h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <VForm @submit="updateArticle" v-slot="{errors}" id="articleForm">
            <div class="row gy-10">
              <div class="col-4">
                <div class="mb-5">
                  <label for="articleImage" class="form-label">封面：</label>
                  <VField id="articleImage" name="封面" type="text" class="form-control" :class="{ 'is-invalid': errors['封面'] }" placeholder="請輸入封面網址" rules="required" v-model="modalArticle.image"/>
                  <ErrorMessage name="封面" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="my-3">
                  <label for="formFile" class="form-label">圖片上傳：</label>
                  <input class="form-control" type="file" id="formFile" @change="uploadImage" :disabled="isLoading">
                </div>
                <img :src="modalArticle.image" alt="main product image" />
              </div>
              <div class="col-8">
                <div class="row gy-3">
                  <div class="col-6">
                    <label for="articleTitle" class="form-label">標題:</label>
                    <VField id="articleTitle" name="文章標題" type="text"
                      class="form-control" :class="{ 'is-invalid': errors['文章標題'] }" placeholder="請輸入 文章標題" rules="required" v-model="modalArticle.title" />
                    <ErrorMessage name="文章標題" class="invalid-feedback" />
                  </div>
                  <div class="col-6">
                    <label for="articleCategory" class="form-label">文章分類:</label>
                    <VField id="articleCategory" name="文章分類" class="form-select"
                      :class="{ 'is-invalid': errors['文章分類'] }" placeholder="請輸入 文章分類"
                      rules="required" v-model="modalArticle.category" as="select">
                      <option value="新聞">新聞</option>
                      <option value="心得">心得</option>
                      <option value="開箱">開箱</option>
                    </VField>
                    <ErrorMessage name="文章分類" class="invalid-feedback" />
                  </div>
                  <div class="col-4">
                    <label for="articleAuthor" class="form-label">作者:</label>
                    <VField id="articleAuthor" name="作者" type="text" class="form-control"
                      :class="{ 'is-invalid': errors['作者'] }" placeholder="請輸入 作者"
                      rules="required" v-model="modalArticle.author"></VField>
                    <ErrorMessage name="作者" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <div class="col-8">
                    <label for="articleDescription" class="form-label">敘述:</label>
                    <VField id="articleDescription" name="敘述" type="text" class="form-control"
                      :class="{ 'is-invalid': errors['敘述'] }" placeholder="請簡單描述本文目的"
                      v-model="modalArticle.description"></VField>
                    <ErrorMessage name="敘述" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <div class="col-4">
                    <span class="fs-6">狀態:</span>
                    <div class="form-check form-switch d-flex align-items-center mb-4">
                      <input class="form-check-input me-2" type="checkbox" role="switch"
                        id="isPublic" v-model="modalArticle.isPublic"/>
                      <label class="form-check-label fs-5 text-theme" for="isPublic"
                        v-if="modalArticle.isPublic">公開</label>
                      <label class="form-check-label fs-5 text-secondary" for="isPublic" v-else>
                        隱藏
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 position-relative article-content">
                <VLoading :active="isLoading" :is-full-page="false"/>
                <!-- CKEditor -->
                <h3 class="fs-6">內容：</h3>
                <ckeditor :editor v-model="modalArticle.content" :config="editorConfig"></ckeditor>
              </div>
            </div>
          </VForm>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="submit" class="btn btn-themeDark" :disabled="isLoading" form="articleForm">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.article-content{
  min-height: 300px;
}
.modal-dialog{
  max-width: 80%;
  width: 100%;
}
</style>