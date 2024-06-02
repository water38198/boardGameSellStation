<script>
// pinia
import cartStore from '@/stores/cartStore';
import { mapActions, mapState } from 'pinia';
//swiper
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

import RandomProduct from '@/components/front/product/RandomProduct.vue';
import Swal from 'sweetalert2';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  components: { RandomProduct , Swiper, SwiperSlide },
  data() {
    return {
      product: {},
      qty: 1,
      isLoading: false,
      modules: [FreeMode, Navigation, Pagination],
    }
  },
  methods: {
    ...mapActions(cartStore,['addToCart']),
    async getProduct() {
      this.isLoading = true;
      try {
        const res = await this.axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/product/${this.id}`);
        this.product = res.data.product;
      } catch(err) {
          Swal.fire({
            icon: 'error',
            title: '發生錯誤',
            text: '即將回到首頁，如果錯誤持續發生，請通知我們，感謝!!',
            didClose: () => {
              this.$router.push('/');
            },
          });
      } finally {
        this.isLoading = false;
        window.scrollTo(0, 0);
      }
    },
    getProductStock(product) { //修改
      const isInCart = this.cart.carts.find(item => item.product.id === product.id);
      console.log(isInCart)
      return product.stock - (isInCart ? isInCart.qty : 0)
    }
  },
  computed: {
    ...mapState(cartStore,['cart', 'loadingItem']),
    id() {
      return this.$route.params.id;
    },
    currentStock() {
      if (this.cart.carts) {
        const productNumInCart = this.cart.carts.find(item => item.product.id === this.id)?.qty || 0;
        return this.product.stock - productNumInCart     
      }
      return this.product.stock
    }
  },
  watch: {
    id() {
      if (this.id) this.getProduct();
    }
  },
  mounted() {
    this.getProduct();
  }
}
</script>

<template>
  <div class="container-lg">
    <VLoading :active="isLoading" />
    <nav aria-label="breadcrumb" class="my-3">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink to="/home" class="text-decoration-none text-theme">首頁</RouterLink>
        </li>
        <li class="breadcrumb-item">
          <RouterLink :to="`/products?category=${product.category}`" class="text-decoration-none text-theme">
            {{ product.category }}
          </RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
    <div class="row g-3 justify-content-center pb-5 border-bottom">
      <div class="col-md-6 col-lg-5">
        <div class="text-center h-100">
          <Swiper :spaceBetween="30" :centeredSlides="true" :autoHeight="true" :pagination="{
            type: 'fraction'
          }" :navigation="true" :modules class="mySwiper">
            <SwiperSlide>
              <img :src="product.imageUrl" alt="product image">
            </SwiperSlide>
            <template v-if="product.imagesUrl">
              <SwiperSlide v-for="url in product.imagesUrl" :key="url">
                <img :src="url" alt="product images">
              </SwiperSlide>
            </template>
          </Swiper>
        </div>
      </div>
      <div class="col-md-6 col-lg-7">
        <div class="h-100 px-4">
          <h2 class="h1 mb-4">
            {{ product.title }}
          </h2>
          <div class="fs-5 fs-md-4 mb-4 ">
            <span class="badge bg-theme me-3">{{ product.category }}</span>
            <span class="badge bg-theme me-3">{{ product.language }}</span>
            <span class="badge bg-theme me-3">{{ product.condition }}</span>
          </div>
          <a :href="product.BGGLink" target="_blank" class="d-block link-theme">BGG連結</a>
          <div class="fs-3">商品敘述：</div>
          <p>{{ product.description }}</p>
          <div class="fs-3">商品內容：</div>
          <p>{{ product.content }}</p>
          <div class="fs-3">剩餘數量：</div>
          <p>{{ product.stock }} {{ product.unit }}</p>
          <div class="fs-3 mb-2">價格：</div>
          <template v-if="product.origin_price === product.price">
            <div>{{ product.price }}元</div>
          </template>
          <template v-else>
            <del class="fs-6 text-secondary">原價：{{product.origin_price}} 元</del>
            <div class="fs-4">
              現在只要 <span class="text-danger">{{ product.price }}</span> 元
            </div>
          </template>
          <div class="input-group w-75 mt-4">
            <template v-if="cart.carts && product.stock">
              <select name="" class="form-select" v-model="qty" :disabled="currentStock === 0">
                <option v-for="i in currentStock" :value="i" :key="i">
                  {{ i }}
                </option>
              </select>
              <button type="button" class="btn btn-danger" :disabled="this.loadingItem === product.id || currentStock == 0" 
              @click="addToCart(product,qty)">
                <span v-if="currentStock == 0">目前無庫存</span>
                <span v-else>加入購物車</span>
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
    <RandomProduct :current-product="product" />
  </div>
</template>