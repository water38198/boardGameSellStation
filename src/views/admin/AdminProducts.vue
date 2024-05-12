<script>
import PaginationComponent from '@/components/PaginationComponent.vue';
import ProductModal from '@/components/dashboard/ProductModal.vue';
import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';

const { VITE_URL, VITE_PATH } = import.meta.env;
let productModal = {};

export default {
  data() {
    return {
      products: [],
      tempProduct: {
        imagesUrl: [],
        imageUrl: '',
      },
      isNew: true,
      page: {},
      isLoading: false,
    };
  },
  components: { PaginationComponent, ProductModal },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      this.$http
        .get(`${VITE_URL}/v2/api/${VITE_PATH}/admin/products?page=${page}`)
        .then((res) => {
          this.products = res.data.products;
          this.page = res.data.pagination;
        })
        .catch((err) => {
          Swal.fire({
            title: '錯誤發生',
            icon: 'error',
            text: `${err.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`,
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    openModal(status, product) {
      if (status === 'new') {
        this.isNew = true;
        this.tempProduct = {
          imageUrl: '',
          imagesUrl: [],
        };
        productModal.show();
      } else if (status === 'edit') {
        this.isNew = false;
        this.tempProduct = { ...product };
        productModal.show();
      }
      // 避免找不到imagesUrl而跳錯
      if (!this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = [];
      }
    },
    closeModal() {
      this.tempProduct = {
        imagesUrl: [],
      };
      productModal.hide();
    },
    deleteProduct(title, id) {
      Swal.fire({
        title: `確定刪除 ${title} 嗎?`,
        text: '刪除後不可復原，確定嗎?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: '確定',
        cancelButtonColor: '#d33',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.isConfirmed) {
          this.isLoading = true;
          this.$http
            .delete(`${VITE_URL}/v2/api/${VITE_PATH}/admin/product/${id}`)
            .then(() => {
              this.isLoading = false;
              Swal.fire({
                icon: 'success',
                title: `${title}刪除成功`,
                showConfirmButton: false,
                timer: 1000,
                didClose: () => {
                  this.getProducts();
                },
              });
            });
        }
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
  mounted() {
    this.getProducts();
    // BS Modal建立
    productModal = new bootstrap.Modal('#productModal');
  },
};
</script>

<template>
  <VLoading :active="isLoading" />
  <div class="py-4">
    <h2 class="h2 text-center">產品列表</h2>
    <div class="text-end">
      <button type="button" class="btn btn-theme text-white" @click="openModal('new')">
        建立新的產品
      </button>
    </div>
        <!-- 產品列表 -->
    <table class="table table-hover align-middle">
      <thead>
        <tr>
          <th scope="col">圖片</th>
          <th scope="col">產品名稱</th>
          <th scope="col">類型</th>
          <th scope="col">語言</th>
          <th scope="col">盒況</th>
          <th scope="col">原價</th>
          <th scope="col">售價</th>
          <th scope="col">庫存</th>
          <th scope="col">是否啟用</th>
          <th scope="col" class="text-center">編輯</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="products">
          <tr v-for="product in products" :key="product.id">
            <td>
              <img
                :src="product.imageUrl"
                alt="productImage"
                class="product-image"
                onerror="this.src='../../../public/no_image_icon.png'"
              />
            </td>
            <td>{{ product.title }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.language }}</td>
            <td>{{ product.condition }}</td>
            <td>{{ product.origin_price }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.stock }}</td>
            <td>
              <span class="text-success" v-if="product.is_enabled">啟用</span>
              <span class="text-danger" v-else>未啟用</span>
            </td>
            <td class="text-center">
              <button
                type="button"
                class="btn btn-outline-theme btn-sm me-2"
                @click="openModal('edit', product)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="deleteProduct(product.title, product.id)"
              >
                刪除
              </button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <PaginationComponent
      :pages="page"
      :get-Method="getProducts"
    ></PaginationComponent>
  </div>

  <!-- productModal -->

    <ProductModal
      :temp-product="tempProduct"
      :is-new="isNew"
      @close-Modal="closeModal"
      @get-Products="getProducts"
    ></ProductModal>
</template>

<style scoped>
.product-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
</style>
