<script>
import Swal from 'sweetalert2';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  props: ['tempProduct', 'isNew'],
  emits: ['closeModal', 'getProducts'],
  data() {
    return {
      newProduct: {},
      loadingItem: '',
    };
  },
  methods: {
    updateProduct() {
      this.loadingItem = 'confirmButton';
      let method = 'post';
      let apiUrl = `${VITE_URL}/v2/api/${VITE_PATH}/admin/product`;
      if (!this.isNew) {
        apiUrl += `/${this.tempProduct.id}`;
        method = 'put';
      }
      this.$http[method](apiUrl, {
        data: this.newProduct,
      })
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: `${method === 'put' ? '修改成功' : '新增成功'}`,
            showConfirmButton: false,
            timer: 1500,
            didClose: () => {
              this.$emit('closeModal');
              this.$emit('getProducts');
            },
          });
        })
        .catch((err) => {
          Swal.fire({
            title: '錯誤發生',
            icon: 'error',
            text: `${err.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`,
          });
        })
        .finally(() => {
          this.loadingItem = '';
        });
    },
    uploadImage(target) {
      let file = document.querySelector('#formFile');
      this.loadingItem = 'images';
      if (target === 'main') {
        file = document.querySelector('#mainImage');
        this.loadingItem = 'mainImage';
      }
      const formData = new FormData();
      formData.append('file-to-upload', file.files[0]);
      this.$http
        .post(`${VITE_URL}/v2/api/${VITE_PATH}/admin/upload`, formData)
        .then((res) => {
          if (!res.data.imageUrl) {
            Swal.fire({
              title: '錯誤發生',
              icon: 'error',
              text: `${res.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`,
            });
          } else if (target === 'main') {
            this.newProduct.imageUrl = res.data.imageUrl;
          } else if (target === 'multi') {
            this.newProduct.imagesUrl.push(res.data.imageUrl);
          }
          file.value = '';
          this.loadingItem = '';
        })
        .catch((err) => {
          Swal.fire({
            title: '錯誤發生',
            icon: 'error',
            text: `${err.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`,
          });
        });
    },
  },
  watch: {
    tempProduct() {
      this.newProduct = { ...this.tempProduct };
    },
  },
};
</script>

<template>
  <div class="modal fade" id="productModal" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="productModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header bg-light">
          <h5 class="modal-title" id="productModalLabel">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button type="button" class="btn-close" @click="$emit('closeModal')"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <VForm @submit="updateProduct" v-slot="{ errors }" class="row"
            ref="ProductModal" id="ProductModal">
            <div class="col-4">
              <div class="mb-5">
                <label for="imageUrl" class="form-label">主要圖片</label>
                <input type="text" placeholder="請輸入圖片連結" id="imageUrl"
                  class="form-control mb-2" v-model="newProduct.imageUrl"/>
                <div class="mb-3">
                  <input class="form-control" type="file" id="mainImage"
                    @change="uploadImage('main')" :disabled="loadingItem === 'mainImage'"/>
                </div>
                <img :src="newProduct.imageUrl" alt="main product image" />
              </div>
              <div>
                <h4>多圖新增</h4>
                <div v-if="Array.isArray(newProduct.imagesUrl)">
                  <template v-for="(image, key) in newProduct.imagesUrl" :key="image">
                    <div class="d-flex justify-content-space-between">
                      <label :for="image" class="form-label">圖片網址{{ key + 1 }}</label>
                      <!-- 刪除按鈕 -->
                      <button type="button" class="btn-close btn-sm ms-auto"
                        aria-label="removeImage" @click="newProduct.imagesUrl.splice(key, 1)">
                      </button>
                    </div>
                    <input type="text" placeholder="請輸入圖片連結" class="form-control mb-1"
                    v-model="newProduct.imagesUrl[key]" :id="image"/>
                    <img :src="image" alt="product images" class="img-fluid mb-4"/>
                  </template>
                  <div v-if="newProduct.imagesUrl[newProduct.imagesUrl.length - 1] ||
                      !newProduct.imagesUrl.length">
                    <button class="btn btn-outline-primary w-100 mb-3" type="button"
                      @click="newProduct.imagesUrl.push('')">新增圖片網址</button>
                    <p class="text-center">或</p>
                    <div class="mb-3">
                      <input class="form-control" type="file" id="formFile"
                        @change="uploadImage('multi')" :disabled="loadingItem === 'images'"/>
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
                    placeholder="請輸入 商品名稱" rules="required" v-model="newProduct.title"></VField>
                  <ErrorMessage name="商品名稱" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="col-6">
                  <label for="productCategory" class="form-label">分類:</label>
                  <VField id="productCategory" name="分類"
                    class="form-control" :class="{ 'is-invalid': errors['分類'] }"
                    placeholder="請輸入 分類" rules="required" v-model="newProduct.category" as="select">
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
                    placeholder="請輸入 單位" rules="required" v-model="newProduct.unit"></VField>
                  <ErrorMessage name="單位" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="col-3">
                  <label for="productStock" class="form-label">數量：</label>
                  <VField id="productStock" name="數量" type="number"
                    class="form-control" :class="{ 'is-invalid': errors['數量'] }"
                    placeholder="請輸入 數量" rules="required" v-model.number="newProduct.stock">
                    </VField>
                  <ErrorMessage name="數量" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="col-6">
                  <label for="productOriginPrice" class="form-label">原價：</label>
                  <VField id="productOriginPrice" name="原價" type="number"
                    class="form-control" :class="{ 'is-invalid': errors['原價'] }"
                    placeholder="請輸入 原價" :rules="{ min_value: 0, required: true }"
                    v-model.number="newProduct.origin_price"
                  ></VField>
                  <ErrorMessage name="原價" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="col-6">
                  <label for="productPrice" class="form-label">售價：</label>
                  <VField id="productPrice" name="售價" type="number"
                    class="form-control" :class="{ 'is-invalid': errors['售價'] }"
                    placeholder="請輸入 售價" :rules="{ min_value: 0, required: true }"
                    v-model.number="newProduct.price"></VField>
                  <ErrorMessage name="售價" class="invalid-feedback"></ErrorMessage>
                </div>
                <div class="col-6">
                  <label for="productLanguage" class="form-label">語言：</label>
                  <select class="form-select" aria-label="tag"
                    v-model="newProduct.language" id="productLanguage">
                    <option selected value="繁中">繁中</option>
                    <option value="簡中">簡中</option>
                    <option value="英文">英文</option>
                  </select>
                </div>
                <div class="col-6">
                  <label for="productCondition" class="form-label">盒況：</label>
                  <select class="form-select" aria-label="tag"
                    v-model="newProduct.condition" id="productCondition">
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
                    v-model.number="newProduct.BGGLink"/>
                </div>
                <div v-if="newProduct.BGGLink">
                  測試：<a :href="newProduct.BGGLink" target="_blank">連結</a>
                </div>
                <hr />
                <div class="col-12">
                  <label for="productDescription" class="form-label">描述：</label>
                  <textarea id="productDescription" rows="3" class="form-control"
                    v-model.trim="newProduct.description"></textarea>
                </div>
                <div class="col-12">
                  <label for="productContent" class="form-label">內容：</label>
                  <textarea id="productContent" rows="3" class="form-control"
                    v-model.trim="newProduct.content"></textarea>
                </div>
                <div class="custom-checkbox">
                  <label for="is_enabled" class="form-label d-block">是否啟用：</label>
                  <input type="checkbox" id="is_enabled"
                    v-model="newProduct.is_enabled" :true-value="1" :false-value="0"/>
                </div>
              </div>
            </div>
          </VForm>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('closeModal')">取消</button>
          <button type="submit" class="btn btn-primary" form="ProductModal"
            :disabled="loadingItem === 'confirmButton'">確認</button>
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
