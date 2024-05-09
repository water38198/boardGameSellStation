<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      products: [],
    };
  },
  methods: {
    getProducts() {
      const { VITE_URL, VITE_PATH } = import.meta.env;
      this.axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/products`)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          Swal.fire({
            title: '錯誤發生',
            icon: 'error',
            text: `${err.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`,
          });
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
<template>
  <div class="wrap-background">
    <div class="container py-5 my-xl-5">
      <h2 class="fs-1 mb-5 d-flex justify-content-between">
        最新上架
        <RouterLink :to="`/products`" class="btn btn-be4 text-b60 fs-4">更多商品</RouterLink>
      </h2>
      <div class="row g-3">
        <div class="col-12 col-lg-4"
        v-for="(product, index) in products.slice(0, 3)"
        :key="product.id"
        data-aos="zoom-in" :data-aos-duration="1000 + 250 * index">
          <RouterLink :to="`/product/${product.id}`" class="text-decoration-none text-black">
            <div class="card">
              <div class="row">
                <div class="col-md-6 col-lg-12">
                  <div>
                    <img :src="product.imageUrl"
                    class="card-img-top img-fluid home-product-image"
                    :alt="product.title" />
                  </div>
                </div>
                <div class="col-md-6 col-lg-12">
                  <div class="card-body d-flex flex-column-reverse flex-lg-column h-100">
                    <div class="fs-4 mb-3 d-none d-md-block">
                      <span class="badge bg-theme me-3">
                        {{product.category}}
                      </span>
                      <span class="badge bg-theme me-3">
                        {{product.language}}
                      </span>
                      <span class="badge bg-theme me-3">
                        {{product.condition}}
                      </span>
                    </div>
                    <p class="mb-auto d-lg-none mt-3 multi-text-truncate">
                      介紹:<br />
                      {{ product.description }}
                    </p>
                    <h5 class="card-title fs-2">
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
  </div>
</template>

<style scoped lang="scss">
  .wrap-background{
    background: linear-gradient(transparent 50%, #0fb99b 50%);
  }
  .home-product-image {
  height: 250px;
  object-position: 50% top;
}
@media (min-width: 992px) {
  .home-product-image {
    height: 400px;
    object-fit: cover;
  }
}
</style>
