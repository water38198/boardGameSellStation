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
      this.axios
        .get(`${VITE_URL}/v2/api/${VITE_PATH}/products/all`).then((res) => {
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
      const length = max < 4 ? max : 4;
      while (array.length < length) {
        const random = Math.floor(Math.random() * (max));
        if (!array.includes(random)) array.push(random);
      }
      return array; // 同類型的桌遊如果大於四個 => 回傳一個包含四個 index 的陣列，小於四個就全列出
    },
  },
  computed: {
    randomProducts() {
      const list = [];
      if (this.products.length > 0) {
        const { category, id } = this.currentProduct;
        const filter = (product) => product.id !== id && product.category === category;
        const filterList = this.products.filter((product) => filter(product)); // 除了本頁產品的所有產品清單
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
  <div class="position-relative mb-4" v-if="randomProducts.length > 0">
    <VLoading :active="isLoading" :is-full-page="false" />
    <h3 class="my-4">類似商品</h3>
    <div class="row g-2">
      <div class="col-lg-3 col-6 align-self-stretch"
        v-for="product in randomProducts" :key="product.id">
        <RouterLink
          :to="`/product/${product.id}`"
          class="text-decoration-none text-black"
        >
          <div class="card h-100">
            <div>
              <div>
                <img :src="product.imageUrl" class="card-img-top img-fluid"
                  alt="productImage"/>
              </div>
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
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .card img{
    height: 150px;
  }
    @media (min-width: 576px) {
    .card img{
      height: 250px;
    }
  }
  @media (min-width: 768px) {
    .card img{
      height: 300px;
    }
  }
</style>
