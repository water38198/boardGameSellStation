<script>
import cartStore from '@/stores/cartStore';
import { mapActions, mapState } from 'pinia';

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(cartStore, ['loadingItem', 'cart']),
  },
  methods: {
    ...mapActions(cartStore, ['addToCart']),
    isInStock(product) {
      const isInCart = this.cart.carts.find((el) => el.product.id === product.id);
      if (isInCart) {
        return isInCart.product.stock === isInCart.qty;
      }
      return false;
    },
  },
};
</script>
<template>
  <RouterLink
    :to="`/product/${product.id}`"
    class="text-reset text-decoration-none product-card" href="#"
  >
    <div class="card h-100">
      <div class="product-image">
        <img
          :src="product.imageUrl"
          class="card-img-top"
          :alt="`${product.title}圖片`"
        />
      </div>
      <div class="card-body">
        <h4 class="card-title">{{ product.title }}</h4>
        <p class="card-text text-truncate my-3">
          {{ product.description }}
        </p>
        <div
          class="h4 text-end"
          v-if="product.origin_price === product.price"
        >
          {{ product.price }}元
        </div>
        <div v-else class="d-flex justify-content-between">
          <div>
            <del class="h6 text-secondary">原價{{ product.origin_price }}元</del>
          </div>
          <div class="h4">
            特價 <span class="text-danger"> {{product.price}}</span> 元
          </div>
        </div>
        <div class="text-center mt-2 text-center">
          <template v-if="cart.carts">
            <button
              type="button"
              class="btn btn-outline-danger"
              disabled
              v-if="isInStock(product)"
            >
              目前無庫存
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              :disabled="loadingItem === product.id"
              @click.self.prevent="addToCart(product)"
              v-else
            >
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
    height: 250px;
    object-position: top;
  }
}

.product-card:hover .card-title {
  color: #0fb99b;
}
</style>
