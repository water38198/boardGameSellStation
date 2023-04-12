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
    <h1 class="h1 text-center my-3">{{ product.title }}</h1>
    <div class="row g-3 mb-5 justify-content-center">
      <div class="col-8 col-md-6 col-lg-5">
        <div class="text-center">
          <Swiper
            :spaceBetween="30"
            :centeredSlides="true"
            :autoHeight="true"
            :pagination="{
              clickable: true,
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
      <div class="col-8 col-md-6 col-lg-7">
        <nav aria-label="breadcrumb">
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
        <div class="row h-100">
          <div class="col-12">
            <div class="h3">商品敘述:</div>
            <p class="p-2">{{ product.description }}</p>
          </div>
          <div class="col-6 col-md-12">
            <div class="h3">內容物:</div>
            <p class="p-2">{{ product.content }}</p>
          </div>

          <div class="col-6 col-md-12">
            <div class="h3">剩餘數量:</div>
            <p class="p-2">{{ product.stock }} {{ product.unit }}</p>
          </div>
          <div class="col-12">
            <div class="h3">價格:</div>
            <div class="h5 p-2" v-if="product.origin_price === product.price">
              {{ product.price }}元
            </div>
            <div v-else class="p-2">
              <del class="h6 text-secondary"
                >原價{{ product.origin_price }}元</del
              >
              <div class="h4">
                現在只要<span class="text-danger">{{ product.price }}</span
                >元
              </div>
            </div>
          </div>
          <div class="col-12 mt-auto">
            <div class="input-group mb-3 w-75">
              <template v-if="product.stock">
                <select class="form-select" v-model="qty">
                  <option v-for="i in product.stock * 1" :key="i" :value="i">
                    {{ i }}
                  </option>
                </select></template
              >
              <template v-else>
                <select class="form-select" v-model="qty">
                  <option v-for="i in 5" :key="i" :value="i">
                    {{ i }}
                  </option>
                </select>
              </template>
              <button
                type="button"
                class="btn btn-danger"
                :disabled="this.loadingItem === product.id"
                @click="addToCart(product, qty)"
              >
                加入購物車
              </button>
            </div>
          </div>
          <div class="col-12">
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
    </div>
  </div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env;
import { mapActions, mapState } from "pinia";
import cartStore from "@/stores/cartStore";
import Swal from "sweetalert2";

//Swiper
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default {
  data() {
    return {
      product: {},
      qty: 1,
      isLoading: false,
      modules: [Autoplay, Pagination, Navigation],
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
    ...mapState(cartStore, ["loadingItem"]),
  },
  mounted() {
    this.getProduct();
  },
};
</script>
<style>
.product-images {
  width: 150px;
}
</style>
