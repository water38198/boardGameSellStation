<script>
import PaginationComponent from '@/components/PaginationComponent.vue';
import ProductModal from '@/components/dashboard/modal/ProductModal.vue';

import Swal from 'sweetalert2';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  components: { PaginationComponent, ProductModal},
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
    }
  },
  methods: {
    async getProducts(page = 1) {
      this.isLoading = true;
      try {
        const res = await this.axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/admin/products?page=${page}`);
        this.products = res.data.products;
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
    deleteProduct(product) {
      Swal.fire({
        title: `確定要刪除 ${product.title} 嗎?`,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '確定',
        confirmButtonColor: 'hsl(0,85%,60%)',
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.isLoading = true;
          try {
            const res = await this.axios.delete(`${VITE_URL}/v2/api/${VITE_PATH}/admin/product/${product.id}`);
            Swal.fire({
              title:'刪除成功',
              icon: 'success',
              text:`${res.data.message}`,
              showConfirmButton: false,
              timer: 1000,
              didClose: () => {
                this.getProducts();
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
        }
      })
    },
    addNewProduct() {
      this.isNew = true;
      this.tempProduct = {
        imagesUrl: [],
        imageUrl: '',
      };
    },
    editProduct(product) {
      this.isNew = false;
      this.tempProduct = product;
    }
  },
  mounted() {
    this.getProducts();
  }
}
</script>

<template>
  <VLoading :active="isLoading" />
  <div class="py-4">
    <h2 class="h2 text-center">商品列表</h2>
    <div class="text-end mb-4">
      <button type="button" class="btn btn-themeDark" data-bs-toggle="modal" data-bs-target="#productModal" @click="addNewProduct">建立新產品</button>
    </div>
  </div>
  <div class="table-responsive">
    <table class="table table-hover align-middle">
      <thead>
        <tr>
          <th scope="col">圖片</th>
          <th scope="col">名稱</th>
          <th scope="col">類型</th>
          <th scope="col">語言</th>
          <th scope="col">盒況</th>
          <th scope="col">原價</th>
          <th scope="col">售價</th>
          <th scope="col">庫存</th>
          <th scope="col">啟用</th>
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="product in products" :key="product.id">
          <td><img :src="product.imageUrl" alt="productImage" class="product-image"></td>
          <td>{{ product.title }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.language }}</td>
          <td>{{ product.condition }}</td>
          <td>{{ product.origin_price }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.stock }}</td>
          <td>
            <span class="text-theme" v-if="product.is_enabled">啟用</span>
            <span class="text-danger" v-else>未啟用</span>
          </td>
          <td>
            <button type="button" class="btn btn-outline-theme btn-sm me-2" data-bs-toggle="modal" data-bs-target="#productModal" @click="editProduct(product)">
              編輯
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteProduct(product)">
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <PaginationComponent :pages="page" @get-Method="getProducts" />
  <ProductModal :is-new="isNew" :temp-product="tempProduct" @get-products="getProducts"/>
</template>

<style scoped>
.product-image {
  width: 50px;
  height: 50px;
}
table{
  min-width: 750px;
}
</style>
