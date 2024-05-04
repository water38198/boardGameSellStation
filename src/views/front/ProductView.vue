<script>
import { mapActions, mapState } from 'pinia';
import Swal from 'sweetalert2';
// Swiper
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Navigation, Pagination } from 'swiper';
import cartStore from '@/stores/cartStore';
import RandomProducts from '../../components/front/RandomProducts.vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      product: {},
      qty: 1,
      isLoading: false,
      category: '',
      modules: [FreeMode, Navigation, Pagination],
    };
  },
  methods: {
    getProduct() {
      this.isLoading = true;
      this.$http
        .get(`${VITE_URL}/v2/api/${VITE_PATH}/product/${this.id}`)
        .then((res) => {
          this.product = res.data.product;
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: '發生錯誤',
            text: '即將回到首頁，如果錯誤持續發生，請通知我們，感謝!!',
            didClose: () => {
              this.$router.push('/');
            },
          });
        }).finally(() => {
          this.isLoading = false;
          window.scrollTo(0, 0);
        });
    },
    getProductStock(product) {
      const productInCart = this.cart.carts.find((el) => el.product.id === product.id);
      return product.stock - (productInCart ? productInCart.qty : 0);
    },
    ...mapActions(cartStore, ['addToCart']),
  },
  components: { Swiper, SwiperSlide, RandomProducts },
  computed: {
    id() {
      return this.$route.params.id;
    },
    ...mapState(cartStore, ['loadingItem', 'cart']),
  },
  mounted() {
    this.getProduct();
  },
  watch: {
    id() {
      if (this.id) {
        this.getProduct();
      }
    },
  },
};
</script>

<template>
    <VLoading
      :active="isLoading"
    />
  <div class="container-lg pt-100">
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
    <div class="row g-3 justify-content-center pb-5 border-bottom">
      <div class="col-12 col-md-6 col-lg-5">
        <div class="text-center h-100">
          <Swiper :spaceBetween="30" :centeredSlides="true" :autoHeight="true"
            :pagination="{
              type: 'fraction',
            }"
            :navigation="true"
            :modules="modules"
            class="mySwiper"
          >
            <SwiperSlide>
              <img :src="product.imageUrl" alt="product image" class="img-fluid"/>
            </SwiperSlide>
            <template v-if="product.imagesUrl">
              <SwiperSlide v-for="i in product.imagesUrl" :key="i + 'image'">
                <img :src="i" alt="product images" class="img-fluid"/>
              </SwiperSlide>
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
          <div>
            <div class="h3">商品敘述:</div>
            <p class="">{{ product.description }}</p>
          </div>
          <div>
            <div class="fs-3">內容物:</div>
            <p>{{ product.content }}</p>
          </div>
          <div>
            <div class="fs-3">剩餘數量:</div>
            <p>{{ product.stock }} {{ product.unit }}</p>
          </div>
          <div>
            <div class="fs-3">價格:</div>
            <div class="fs-5" v-if="product.origin_price === product.price">
              {{ product.price }}元
            </div>
            <div v-else class="p-2">
              <del class="h6 text-secondary">原價{{ product.origin_price }}元</del>
              <div class="fs-4">
                現在只要<span class="text-danger">{{ product.price }}</span>元
              </div>
            </div>
          </div>
          <div class="pt-4">
            <div class="input-group mb-3 w-75">
              <template v-if="cart.carts && product.stock">
                <select
                  class="form-select" v-model="qty"
                  :disabled="getProductStock(product) == 0">
                  <!-- 如果購物車內有本商品則扣掉購物車內的數量，沒有就-0 -->
                  <option v-for="i in getProductStock(product)" :key="i" :value="i">
                    {{ i }}
                  </option>
                </select>
                <button type="button" class="btn btn-danger"
                  :disabled="
                    this.loadingItem === product.id || getProductStock(product) == 0"
                    @click="addToCart(product, qty)">
                  <span v-if="getProductStock(product) == 0">目前無庫存</span>
                  <span v-else>加入購物車</span>
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <RandomProducts :current-product="product" />
  </div>
</template>
