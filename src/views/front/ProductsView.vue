<script>
import { mapActions, mapState } from 'pinia';
import productStore from '@/stores/productStore';
import ProductsNavbar from '@/components/front/products/ProductsNavbar.vue';
import ProductCard from '@/components/front/products/ProductCard.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';

export default {
  computed: {
    ...mapState(productStore, ['products', 'page', 'productsLoading']),
    category() {
      return this.$route.query.category || '';
    },
  },
  components: {
    PaginationComponent, ProductsNavbar, ProductCard,
  },
  methods: {
    ...mapActions(productStore, ['getProducts']),
    changeCategory(category) {
      this.$router.push(`/products?category=${category}`);
      window.scrollTo(0, 0);
    },
  },
  watch: {
    category() {
      this.getProducts(1, this.category);
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
        <ProductsNavbar  @change-category="changeCategory" :category="category"/>
      </div>
      <div class="col-lg-9 position-relative">
        <VLoading
          :active="productsLoading"
          :is-full-page="false"
        />
        <div class="row g-3 align-items-stretch">
          <h3 class="h3 text-theme text-center">{{ category||'全部' }}</h3>
          <template v-if="products.length">
            <div
              class="col-md-6 col-xl-4"
              v-for="(product, i) in products"
              :key="product.id"
              data-aos="fade-up"
              :data-aos-duration="`${1000 + i * 200}`"
            >
              <ProductCard :product="product"/>
            </div>
          </template>
          <template v-else>
            <div class="text-center">
              <img
                src="https://images.unsplash.com/photo-1660922771242-c598e0808188?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                alt="sorry, there is no items in this category"
                class="w-50"
              />
            </div>
            <div class="text-center fs-4">
              很抱歉，目前沒有此類商品，近期將會新增!
            </div>
          </template>
          <PaginationComponent
            :pages="page"
            :get-Method="getProducts" v-if="page.total_pages > 1"
          ></PaginationComponent>
        </div>
      </div>
    </div>
  </div>
  <!-- 產品列表 -->
</template>
