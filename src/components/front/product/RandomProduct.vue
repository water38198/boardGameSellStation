<script>
import Swal from 'sweetalert2';

import ProductCard from '@/components/front/products/ProductCard.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  props: {
    currentProduct: {
      type: Object,
    }
  },
  components: { ProductCard },
  data() {
    return {
      products: [],
      isLoading:false,
    }
  },
  methods: {
    async getProducts() {
      this.isLoading = true;
      try {
        const res = await this.axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/products/all`);
        this.products = res.data.products;
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
    getRandomArray(max) {
      const array = [];
      const length = max < 4 ? max : 4;
      while (array.length < length) {
        const random = Math.floor(Math.random() * max);
        if(!array.includes(random)) array.push(random)
      }
      return array
    },
  },
  computed: {
    randomProducts() {
      const list = [];
      if (this.products.length > 0) {
        if (this.currentProduct) {
          const { category, id } = this.currentProduct;
          const filteredList = this.products.filter((product) => product.category == category && product.id !== id)
          const randomArray = this.getRandomArray(filteredList.length);
          randomArray.forEach(number => list.push(filteredList[number]));
        } else {
          const randomArray = this.getRandomArray(4);
          randomArray.forEach(number => list.push(this.products[number]));
        }
      }
      return list;
    }
  },
  mounted() {
    this.getProducts();
  }
}
</script>

<template>
  <div v-if="randomProducts.length > 0" class="mb-4">
    <VLoading :active="isLoading" />
    <h3 v-if="currentProduct" class="my-4">類似商品</h3>
    <h3 v-else class="my-4">猜你喜歡</h3>
    <div class="row g-2">
      <div v-for="product in randomProducts" :key="product.id" class="col-lg-3 col-6 align-self-stretch">
        <ProductCard :product></ProductCard>
      </div>
    </div>
  </div>
</template>