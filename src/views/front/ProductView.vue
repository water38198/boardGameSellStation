<script>
import { mapActions, mapState } from "pinia";
import cartStore from "@/stores/cartStore";
import frontStore from "../../stores/frontStore";
import Swal from "sweetalert2";
//Swiper
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
// import required modules
import { FreeMode, Navigation, Pagination } from "swiper";

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      product: {},
      qty: 1,
      isLoading: false,
      modules: [FreeMode, Navigation, Pagination],
      recommendProduct: [],
    };
  },
  methods: {
    getProduct() {
      this.isLoading = true;
      const { id } = this.$route.params;
      this.$http
        .get(`${VITE_URL}/v2/api/${VITE_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product;
          this.isLoading = false;
          const sameType = this.products.filter(
            (el) =>
              el.category === this.product.category &&
              el.title !== this.product.title
          );
          this.recommendProduct = sameType.slice(0, 4);
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "發生錯誤",
            text: "即將回到首頁，如果錯誤持續發生，請通知我們，感謝!!",
            didClose: () => {
              this.$router.push("/");
            },
          });
        });
    },
    ...mapActions(cartStore, ["addToCart"]),
  },
  components: { Swiper, SwiperSlide },
  computed: {
    ...mapState(cartStore, ["loadingItem", "cart"]),
    ...mapState(frontStore, ["products"]),
  },
  mounted() {
    this.getProduct();
    //監聽產品id改變時要刷新頁面
    this.$watch(
      () => this.$route.params,
      () => {
        const { id } = this.$route.params;
        if (id) {
          this.getProduct();
        }
      }
    );
  },
};
</script>

<template>
  <!-- Loading Layout -->
  <div class="vl-parent">
    <VLoading
      v-model:active="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    />
  </div>
  <div class="container-lg">
    <nav aria-label="breadcrumb" class="my-3">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink to="/" class="text-decoration-none text-theme"
            >首頁</RouterLink
          >
        </li>
        <li class="breadcrumb-item">
          <RouterLink to="/products" class="text-decoration-none text-theme"
            >全部商品</RouterLink
          >
        </li>

        <li class="breadcrumb-item active" aria-current="page">
          {{ product.title }}
        </li>
      </ol>
    </nav>
    <div class="row g-3 mb-5 justify-content-center mb-5">
      <div class="col-10 col-md-6 col-lg-5">
        <div class="text-center h-100">
          <Swiper
            :spaceBetween="30"
            :centeredSlides="true"
            :autoHeight="true"
            :pagination="{
              type: 'fraction',
            }"
            :navigation="true"
            :modules="modules"
            class="mySwiper"
          >
            <SwiperSlide>
              <img
                :src="product.imageUrl"
                alt="product image"
                class="img-fluid"
              />
            </SwiperSlide>
            <template v-if="product.imagesUrl">
              <SwiperSlide v-for="i in product.imagesUrl" :key="i + 'image'"
                ><img :src="i" alt="product images" class="img-fluid"
              /></SwiperSlide>
            </template>
          </Swiper>
        </div>
      </div>
      <div class="col-10 col-md-6 col-lg-7">
        <div class="row h-100">
          <h1 class="h1 mb-3">{{ product.title }}</h1>
          <div class="fs-4 mb-3 d-none d-md-block">
            <span class="badge bg-theme me-3">{{ product.category }}</span>
            <span class="badge bg-theme me-3">{{ product.language }}</span>
            <span class="badge bg-theme me-3">{{ product.condition }}</span>
          </div>
          <div class="col-12">
            <div class="h3">商品敘述:</div>
            <p class="p-2">{{ product.description }}</p>
          </div>
          <div class="col-12">
            <div class="fs-3">內容物:</div>
            <p>{{ product.content }}</p>
          </div>
          <div class="col-12">
            <div class="fs-3">剩餘數量:</div>
            <p>{{ product.stock }} {{ product.unit }}</p>
          </div>
          <div class="col-12">
            <div class="fs-3">價格:</div>
            <div class="fs-5" v-if="product.origin_price === product.price">
              {{ product.price }}元
            </div>
            <div v-else class="p-2">
              <del class="h6 text-secondary"
                >原價{{ product.origin_price }}元</del
              >
              <div class="fs-4">
                現在只要<span class="text-danger">{{ product.price }}</span
                >元
              </div>
            </div>
          </div>
          <div class="col-12 mt-auto">
            <div class="input-group mb-3 w-75">
              <template v-if="cart.carts && product.stock">
                <select
                  class="form-select"
                  v-model="qty"
                  :disabled="
                    product.stock ===
                    cart.carts.find((el) => el.product.id === product.id)?.qty
                  "
                >
                  <!-- 如果購物車內有本商品則扣掉購物車內的數量，沒有就-0 -->
                  <option
                    v-for="i in product.stock -
                    (cart.carts.find((el) => el.product.id === product.id)
                      ? cart.carts.find((el) => el.product.id === product.id)
                          .qty
                      : 0)"
                    :key="i"
                    :value="i"
                  >
                    {{ i }}
                  </option>
                </select>
                <button
                  type="button"
                  class="btn btn-danger"
                  :disabled="
                    this.loadingItem === product.id ||
                    product.stock ===
                      cart.carts.find((el) => el.product.id === product.id)?.qty
                  "
                  @click="addToCart(product, qty)"
                >
                  <span
                    v-if="
                      product.stock ===
                      cart.carts.find((el) => el.product.id === product.id)?.qty
                    "
                    >目前無庫存</span
                  >
                  <span v-else>加入購物車</span>
                </button>
              </template>
            </div>
          </div>
          <div class="text-start">
            <button
              class="btn btn-outline-secondary w-25"
              @click="this.$router.go(-1)"
            >
              返回
            </button>
          </div>
        </div>
      </div>
    </div>
    <h3 class="my-4 pt-5">類似商品</h3>
    <div class="row g-2">
      <div
        class="col-lg-3 col-md-4 col-sm-6 col-8 align-self-stretch mx-auto"
        v-for="product in recommendProduct"
        :key="product.id"
      >
        <RouterLink
          :to="`/product/${product.id}`"
          class="text-decoration-none text-black"
        >
          <div class="card h-100">
            <div class="row">
              <div class="col-lg-12">
                <img
                  :src="product.imageUrl"
                  class="card-img-top img-fluid"
                  alt="productImage"
                  style="height: 300px; object-fit: cover"
                />
              </div>
              <div class="col-lg-12">
                <div
                  class="card-body d-flex flex-column-reverse flex-lg-column"
                >
                  <div class="fs-6 mb-3 d-none d-md-block">
                    <span class="badge bg-theme me-3">{{
                      product.category
                    }}</span>
                    <span class="badge bg-theme me-3">{{
                      product.language
                    }}</span>
                    <span class="badge bg-theme me-3">{{
                      product.condition
                    }}</span>
                  </div>
                  <h5 class="card-title fs-4">
                    {{ product.title }}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
