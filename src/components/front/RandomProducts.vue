<script>
import Swal from 'sweetalert2';

export default {
  props: {
    currentProduct: Object,
  },
  data() {
    return {
      products: [],
      isLoading: false,
    };
  },
  methods: {
    getProducts() {
      const { VITE_URL, VITE_PATH } = import.meta.env;
      this.isLoading = true;
      this.$http.get(`${VITE_URL}/v2/api/${VITE_PATH}/products/all`).then((res) => {
        this.products = res.data.products;
      }).catch((err) => {
        Swal.fire({
          title: '錯誤發生',
          icon: 'error',
          text: `${err.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`,
        });
      }).finally(() => {
        this.isLoading = false;
      });
    },
    useRandomArray(max) {
      const array = [];
      let length = 4;
      if (max < 4) length = max;
      while (array.length < length) {
        const random = Math.floor(Math.random() * (max));
        if (!array.includes(random)) array.push(random);
      }
      return array;
    },
  },
  computed: {
    randomProducts() {
      const list = [];
      if (this.products.length > 0) {
        const { category, id } = this.currentProduct;
        const filter = (product) => product.id !== id && product.category === category;
        const filterList = this.products.filter((product) => filter(product));
        const randomArray = this.useRandomArray(filterList.length);
        randomArray.forEach((number) => list.push(filterList[number]));
      }
      return list;
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<template>
  <div class="position-relative" v-if="randomProducts.length > 0">
    <VLoading :active="isLoading" :is-full-page="false" />
    <h3 class="my-4 pt-5">類似商品</h3>
    <div class="row g-2">
      <div
        class="col-lg-3 col-md-4 col-sm-6 col-8 align-self-stretch mx-auto"
        v-for="product in randomProducts"
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
