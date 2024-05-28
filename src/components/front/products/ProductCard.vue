<script>
import cartStore from '@/stores/cartStore';
import { mapState, mapActions } from 'pinia';

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(cartStore,['loadingItem', 'cart']),
  },
  methods: {
    ...mapActions(cartStore, ['addToCart']),
    isInStock(product) {
      const isInCart = this.cart.carts.find(el => el.product.id === product.id);
      return isInCart ? isInCart.product.stock === isInCart.qty : false;
    }
  }
}
</script>

<template>
  <RouterLink :to="`/product/${product.id}`" class="text-reset text-decoration-none product-card">
    <div class="card w-100">
      <div class="product-image">
        <img :src="product.imageUrl" class="card-img-top" :alt="`${product.title}圖片`">
      </div>
      <div class="card-body">
        <h4 class="card-title">{{ product.title }}</h4>
        <p class="card-text text-truncate my-3">
          {{ product.description }}
        </p>
        <div v-if="product.origin_price === product.price" class="h4 text-end">
          {{ product.price }} 元
        </div>
        <div v-else class="d-flex justify-content-between mb-4">
          <div>
            <del class="text-secondary">原價 {{ product.origin_price }} 元</del>
          </div>
          <div>
            特價 <span class="text-danger h4">{{ product.price }}</span> 元
          </div>
        </div>
        <div class="text-center mt-4">
          <template v-if="cart.carts">
            <button v-if="isInStock(product)" type="button" class="btn btn-outline-danger" disabled>
              目前無庫存
            </button>
            <button v-else type="button" class="btn btn-outline-danger"
            :disabled="loadingItem === product.id" @click.self.prevent="addToCart(product)">
              加入購物車
            </button>
          </template>
        </div>
      </div>
    </div>

  </RouterLink>
</template>

<style scoped lang="scss">
.product-image{
  img{
    height: 300px;
    object-position: top;
  }
}

.product-card:hover .card-title,
.product-card:focus-visible .card-title {
  color: #0fb99b;
}
</style>