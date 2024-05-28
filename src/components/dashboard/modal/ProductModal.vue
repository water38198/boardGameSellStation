<script>
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  props: {
    isNew: {
      type: Boolean,
    },
    tempProduct: {
      type: Object,
    }
  },
  data() {
    return {
      modalProduct: {},
      isLoading: false,
      imageLoading: false,
      modal: null,
    }
  },
  methods: {
    async updateProduct() {
      this.isLoading = true;
      const method = this.isNew ? 'post' : 'put';
      const apiUrl = this.isNew ? `${VITE_URL}/v2/api/${VITE_PATH}/admin/product` : `${VITE_URL}/v2/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`;
      try {
        const res = await this.axios[method](apiUrl, {
          data: this.modalProduct,
        });
        Swal.fire({
          title: `${res.data.message}`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          didClose: () => {
            this.$emit('getProducts');
            this.modal.hide();
          }
        })
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
    async uploadImage(target) {
      this.imageLoading = true;
      let file = null;
      if (target === 'main') {
        file = this.$refs.mainImage;
      } else {
        file= this.$refs.multiImage;
      }
      const formData = new FormData();
      formData.append('file-to-upload', file.files[0]);
      try {
        const res = await this.axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/admin/upload`, formData);
        if (!res.data.imageUrl) {
          Swal.fire({
            title: '錯誤發生',
            icon: 'error',
            text: `${res.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`,
          });
        } else if (target === 'main') {
          this.modalProduct.imageUrl = res.data.imageUrl;
        } else{
          this.modalProduct.imagesUrl.push(res.data.imageUrl);
        }
      } catch (err) {
        Swal.fire({
          title: '錯誤發生',
          icon: 'error',
          text: `${err.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`,
        });
      } finally {
        file.value = '';
        this.imageLoading = false;
      }
    }
  },
  watch: {
    tempProduct() {
      this.modalProduct = { ...this.tempProduct };
      if(!this.modalProduct.imagesUrl) this.modalProduct.imagesUrl = []
    }
  },
  mounted() {
    this.modal = new bootstrap.Modal('#productModal');
  },
}
</script>

<template>
  <div class="modal fade" id="productModal" data-bs-keyboard="false" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header bg-light">
          <h2 class="modal-title" id="productModalLabel">
            <span v-if="isNew">新增商品</span>
            <span v-else>編輯商品</span>
          </h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <VForm @submit="updateProduct" v-slot="{errors}" id="productForm">
            <div class="row">
              <div class="col-4">
                <div class="mb-5">
                  <label for="productImage" class="form-label">主要圖片:</label>
                  <VField id="productImage" name="主要圖片" type="text"
                    class="form-control" :class="{ 'is-invalid': errors['主要圖片'] }"
                    placeholder="請輸入 主要圖片網址" rules="required" v-model="modalProduct.imageUrl"></VField>
                  <ErrorMessage name="主要圖片" class="invalid-feedback"></ErrorMessage>
                  <div class="my-3">
                    <input class="form-control" type="file" ref="mainImage" @change="uploadImage('main')" :disabled="imageLoading"/>
                  </div>
                  <img :src="modalProduct.imageUrl" alt="main product image" />
                </div>
                <div>
                  <h4>多圖新增</h4>
                  <div v-if="Array.isArray(modalProduct.imagesUrl)">
                    <template v-for="(url,index) in modalProduct.imagesUrl" :key="url + index">
                      <div class="d-flex justify-content-between">
                        <label :for="url" class="form-label">圖片網址{{ index + 1 }}</label>
                        <!-- 刪除按鈕 -->
                        <button type="button" class="btn-close btn-sm ms-auto"
                          aria-label="removeImage" @click="modalProduct.imagesUrl.splice(index, 1)">
                        </button>
                      </div>
                      <input type="text" placeholder="請輸入圖片連結" class="form-control mb-1"
                      v-model="modalProduct.imagesUrl[index]" :id="url"/>
                      <img :src="url" alt="product images" class="img-fluid mb-4"/>
                    </template>
                    <div v-if="modalProduct.imagesUrl[modalProduct.imagesUrl.length - 1] ||
                        !modalProduct.imagesUrl.length">
                      <button class="btn btn-outline-themeDark w-100 mb-3" type="button"
                        @click="modalProduct.imagesUrl.push('')">新增圖片網址</button>
                      <p class="text-center">或</p>
                      <div class="mb-3">
                        <input class="form-control" type="file" ref="multiImage"
                          @change="uploadImage('multi')" :disabled="imageLoading"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-8">
                <div class="row gy-3">
                  <div class="col-12">
                    <label for="productTitle" class="form-label">商品名稱:</label>
                    <VField id="productTitle" name="商品名稱" type="text"
                      class="form-control" :class="{ 'is-invalid': errors['商品名稱'] }"
                      placeholder="請輸入 商品名稱" rules="required" v-model="modalProduct.title"></VField>
                    <ErrorMessage name="商品名稱" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <div class="col-6">
                    <label for="productCategory" class="form-label">分類:</label>
                    <VField id="productCategory" name="分類"
                      class="form-control" :class="{ 'is-invalid': errors['分類'] }"
                      placeholder="請輸入 分類" rules="required" v-model="modalProduct.category" as="select">
                      <option selected value="策略">策略</option>
                      <option value="家庭">家庭</option>
                      <option value="派對">派對</option>
                      <option value="陣營">陣營</option>
                      <option value="雙人">雙人</option>
                      <option value="合作">合作</option>
                      <option value="劇情">劇情</option>
                    </VField>
                    <ErrorMessage name="分類" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <div class="col-3">
                    <label for="productUnit" class="form-label">單位:</label>
                    <VField id="productUnit" name="單位" type="text"
                      class="form-control" :class="{ 'is-invalid': errors['單位'] }"
                      placeholder="請輸入 單位" rules="required" v-model="modalProduct.unit"></VField>
                    <ErrorMessage name="單位" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <div class="col-3">
                    <label for="productStock" class="form-label">數量：</label>
                    <VField id="productStock" name="數量" type="number"
                      class="form-control" :class="{ 'is-invalid': errors['數量'] }"
                      placeholder="請輸入 數量" rules="required" v-model.number="modalProduct.stock">
                      </VField>
                    <ErrorMessage name="數量" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <div class="col-6">
                    <label for="productOriginPrice" class="form-label">原價：</label>
                    <VField id="productOriginPrice" name="原價" type="number"
                      class="form-control" :class="{ 'is-invalid': errors['原價'] }"
                      placeholder="請輸入 原價" :rules="{ min_value: 0, required: true }"
                      v-model.number="modalProduct.origin_price"
                    ></VField>
                    <ErrorMessage name="原價" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <div class="col-6">
                    <label for="productPrice" class="form-label">售價：</label>
                    <VField id="productPrice" name="售價" type="number"
                      class="form-control" :class="{ 'is-invalid': errors['售價'] }"
                      placeholder="請輸入 售價" :rules="{ min_value: 0, required: true }"
                      v-model.number="modalProduct.price"></VField>
                    <ErrorMessage name="售價" class="invalid-feedback"></ErrorMessage>
                  </div>
                  <div class="col-6">
                    <label for="productLanguage" class="form-label">語言：</label>
                    <select class="form-select" aria-label="tag"
                      v-model="modalProduct.language" id="productLanguage">
                      <option selected value="繁中">繁中</option>
                      <option value="簡中">簡中</option>
                      <option value="英文">英文</option>
                    </select>
                  </div>
                  <div class="col-6">
                    <label for="productCondition" class="form-label">盒況：</label>
                    <select class="form-select" aria-label="tag"
                      v-model="modalProduct.condition" id="productCondition">
                      <option selected value="盒損">盒損</option>
                      <option value="件損">件損</option>
                      <option value="完好">完好</option>
                      <option value="其他">其他</option>
                    </select>
                  </div>
                  <div class="col-12">
                    <label for="BGG連結" class="form-label">BGG連結：</label>
                    <input type="text" name="BGGLink" id="BGG連結"
                      class="form-control" placeholder="請輸入 BGG 連結"
                      v-model.number="modalProduct.BGGLink"/>
                  </div>
                  <div v-if="modalProduct.BGGLink">
                    測試：<a :href="modalProduct.BGGLink" target="_blank">連結</a>
                  </div>
                  <hr />
                  <div class="col-12">
                    <label for="productDescription" class="form-label">描述：</label>
                    <textarea id="productDescription" rows="8" class="form-control"
                      v-model.trim="modalProduct.description"></textarea>
                  </div>
                  <div class="col-12">
                    <label for="productContent" class="form-label">內容：</label>
                    <textarea id="productContent" rows="3" class="form-control"
                      v-model.trim="modalProduct.content"></textarea>
                  </div>
                  <div class="custom-checkbox">
                    <label for="is_enabled" class="form-label d-block">是否啟用：</label>
                    <input type="checkbox" id="is_enabled"
                      v-model="modalProduct.is_enabled" :true-value="1" :false-value="0"/>
                  </div>
                </div>
              </div>
            </div>
          </VForm>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="submit" class="btn btn-themeDark" :disabled="isLoading" form="productForm">
            <span v-if="isNew">新增</span>
            <span v-else>修改</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.custom-checkbox{
  input{
    -webkit-appearance: none;
    appearance: none;
    position: relative;
    width: 60px;
    aspect-ratio: 2;
    border-radius: 20px;
    outline: none;
    background-color: #c6c6c6;
    box-shadow: inset 0 0 5px rgb(0,0,0,0.2);
    transition: background-color .3s ease-in-out;
    &::before{
      content: '';
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #fff;
      box-shadow: 0 2px 5px rgb(0,0,0,.2);
      left: 0;
      transform: scale(1.1);
      transition: left .3s ease-in-out;
    }
  }

  input:checked{
    background-color: var(--bs-theme);
    &::before{
      left: 30px;
    }
  }
}
</style>