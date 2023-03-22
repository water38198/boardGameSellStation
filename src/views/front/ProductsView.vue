<template>
  <div class="container bg-white py-5">
    <div class="row g-3">
      <div class="col-lg-3">
        <div class="sticky-top" style="top: 90px">
          <h3 class="text-theme text-center h3">商品類別</h3>
          <div
            class="list-group text-center fs-5 flex-row flex-lg-column list-group-flush"
          >
            <a
              class="list-group-item list-group-item-action active list-group-item"
              aria-current="true"
              data-bs-toggle="list"
              href="#"
              @click.prevent="changeCategory('all', $event)"
            >
              全部
            </a>
            <a
              class="list-group-item list-group-item-action"
              data-bs-toggle="list"
              href="#"
              @click.prevent="changeCategory('策略', $event)"
              >策略</a
            >
            <a
              class="list-group-item list-group-item-action"
              data-bs-toggle="list"
              href="#"
              @click.prevent="changeCategory('家庭', $event)"
              >家庭</a
            >
            <a
              class="list-group-item list-group-item-action"
              data-bs-toggle="list"
              href="#"
              @click.prevent="changeCategory('派對', $event)"
              >派對</a
            >
            <a
              class="list-group-item list-group-item-action"
              data-bs-toggle="list"
              href="#"
              @click.prevent="changeCategory('雙人', $event)"
              >雙人</a
            >
            <a
              class="list-group-item list-group-item-action"
              data-bs-toggle="list"
              href="#"
              @click.prevent="changeCategory('合作', $event)"
              >合作</a
            >
            <a
              class="list-group-item list-group-item-action"
              data-bs-toggle="list"
              href="#"
              @click.prevent="changeCategory('劇情', $event)"
              >劇情</a
            >
          </div>
        </div>
      </div>
      <div class="col-lg-9 vl-parent">
        <VLoading
          v-model:active="productIsLoading"
          :can-cancel="false"
          :is-full-page="false"
        >
        </VLoading>
        <div class="row g-3 align-items-stretch">
          <h3 class="h3 text-theme text-center">{{ listTitle }}</h3>
          <template v-if="products.length">
            <div
              class="col-6 col-xl-4"
              v-for="(product, i) in products"
              :key="product.id"
              data-aos="fade-up"
              :data-aos-duration="`${1000 + i * 200}`"
            >
              <div class="card h-100">
                <img
                  :src="product.imageUrl"
                  class="card-img-top"
                  :alt="`${product.title}圖片`"
                  style="height: 250px; object-fit: cover; object-position: top"
                />
                <div class="card-body d-flex flex-column">
                  <h4 class="card-title">{{ product.title }}</h4>
                  <p class="card-text text-truncate my-3">
                    {{ product.description }}
                  </p>
                  <div
                    class="h4 mt-auto text-end"
                    v-if="product.origin_price === product.price"
                  >
                    {{ product.price }}元
                  </div>
                  <div v-else class="mt-auto d-flex justify-content-between">
                    <div>
                      <del class="h6">原價{{ product.origin_price }}元</del>
                    </div>
                    <div class="h4">
                      現在只要<span class="text-danger">{{
                        product.price
                      }}</span
                      >元
                    </div>
                  </div>
                  <div
                    class="text-center mt-2 d-flex flex-column flex-sm-row justify-content-between"
                  >
                    <RouterLink
                      :to="`/product/${product.id}`"
                      class="btn btn-outline-theme d-block"
                      >查看更多</RouterLink
                    >

                    <button
                      type="button"
                      class="btn btn-outline-danger  d-block"
                      :disabled="loadingItem === product.id"
                      @click="addToCart(product)"
                    >
                      加入購物車
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="text-center">
              <img
                src="https://images.unsplash.com/photo-1660922771242-c598e0808188?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                alt=""
                class="w-50"
              />
            </div>
            <div class="text-center fs-4">
              很抱歉，目前沒有此類商品，近期將會新增!
            </div>
          </template>
          <PaginationComponent
            :pages="page"
            :get-Method="getProducts"
          ></PaginationComponent>
        </div>
      </div>
    </div>
  </div>
  <!-- 產品列表 -->
</template>

<script>
import { mapActions, mapState } from "pinia";
import cartStore from "../../stores/cartStore";
import PaginationComponent from "../../components/PaginationComponent.vue";
const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      products: [],
      page: {},
      productIsLoading: false,
      category: "all",
      listTitle: "全部",
    };
  },
  computed: {
    ...mapState(cartStore, ["loadingItem"]),
  },
  components: {
    PaginationComponent,
  },
  methods: {
    changeCategory(category, event) {
      this.listTitle = event.target.textContent;
      this.category = category;
      this.getProducts(1, this.category);
    },
    getProducts(page = 1, category = "") {
      this.productIsLoading = true;
      if (category === "all") {
        category = "";
      }
      this.$http
        .get(
          `${VITE_URL}/v2/api/${VITE_PATH}/products?page=${page}&category=${category}`
        )
        .then((res) => {
          this.products = res.data.products;
          this.page = res.data.pagination;
          this.productIsLoading = false;
        });
    },
    ...mapActions(cartStore, ["addToCart"]),
  },
  mounted() {
    this.getProducts();
  },
};
</script>
<style>
.list-group-flush > .list-group-item:last-child {
  border-bottom: var(--bs-list-group-border-width) solid
    var(--bs-list-group-border-color);
}
</style>
