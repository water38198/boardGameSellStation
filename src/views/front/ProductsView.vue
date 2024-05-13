<script>
import CategoryNavbar from '@/components/front/CategoryNavbar.vue';
import ProductCard from '@/components/front/products/ProductCard.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      products: [],
      page: {},
      isLoading: false,
      categoryList: ['全部', '策略', '家庭', '派對', '雙人', '合作', '劇情'],
    };
  },
  computed: {
    category() {
      return this.$route.query.category || '';
    },
  },
  components: {
    PaginationComponent, ProductCard, CategoryNavbar,
  },
  methods: {
    getProducts(page = 1, category = '') {
      const { VITE_URL, VITE_PATH } = import.meta.env;
      this.isLoading = true;
      this.axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/products?page=${page}&category=${category}`)
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
    changeCategory(category) {
      this.$router.push(`/products?category=${category}`);
      window.scrollTo(0, 0);
    },
  },
  watch: {
    category() {
      if (this.$route.path === '/products') {
        if (this.category === '全部') this.getProducts(1, '');
        else { this.getProducts(1, this.category); }
      }
    },
  },
  mounted() {
    this.getProducts(1, this.category);
  },
};
</script>

<template>
  <div class="container bg-white pt-100 pb-5">
    <div class="row g-3">
      <div class="col-lg-3">
        <CategoryNavbar @change-category="changeCategory" :category="category"
        :category-list="categoryList">
        <template #header>
          <h3 class="text-theme text-center h3">商品類別</h3>
        </template>
        </CategoryNavbar>
      </div>
      <div class="col-lg-9 position-relative">
        <VLoading :active="isLoading" :is-full-page="false"/>
        <div class="row g-3 align-items-stretch">
          <h3 class="h3 text-theme text-center">{{ category||'全部' }}</h3>
          <template v-if="products.length">
            <div class="col-md-6 col-xl-4" v-for="(product, i) in products" :key="product.id"
              data-aos="fade-up" :data-aos-duration="`${1000 + i * 200}`">
              <ProductCard :product="product"/>
            </div>
          </template>
          <template v-else>
            <div class="text-center">
              <img src="https://images.unsplash.com/photo-1660922771242-c598e0808188?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt="sorry, there is no items in this category" class="w-50"/>
            </div>
            <div class="text-center fs-4">
              很抱歉，目前沒有此類商品，近期將會新增!
            </div>
          </template>
          <PaginationComponent v-if="page.total_pages > 1" :pages="page" @get-Method="getProducts">
          </PaginationComponent>
        </div>
      </div>
    </div>
  </div>
  <!-- 產品列表 -->
</template>
