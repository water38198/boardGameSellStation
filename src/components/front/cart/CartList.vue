<script>
import { mapActions, mapState } from 'pinia';
import cartStore from '@/stores/cartStore';

export default {
  props: {
    cart:{
      type: Object,
      required:true,
    }
  },
  computed: {
    ...mapState(cartStore,['loadingItem'])
  },
  methods: {
    ...mapActions(cartStore, ['deleteCartItem', 'updateItemNum', 'deleteCartAll'])
  }
}
</script>

<template>
  <ul class="list-unstyled cart-list">
    <li class="card mb-3" v-for="item in cart.carts" :key="item.id">
      <div class="d-flex">
        <img :src="item.product.imageUrl" class="rounded-start w" :alt="item.product.title + ' image'"/>
        <div class="flex-grow-1 ">
          <div class="p-2 d-flex flex-column justify-content-between h-100">
            <h5 class="card-title h5 text-truncate">{{ item.product.title }}</h5>
            <div class="mb-2">
              <small>單價：{{ item.product.price }}</small>
            </div>
            <div class="card-text d-flex align-items-center mb-2">
              <span class="mb-2 d-inline-block">數量：</span>
              <select class="form-select form-select-sm w-auto flex-grow-1" v-model="item.qty" @change="updateItemNum(item)">
                <option :value="i" v-for="i in item.product.stock" :key="i + '123'">
                  {{ i }}
                </option>
              </select>
              <button type="button" class="btn btn-outline-danger btn-sm ms-2" :disabled="loadingItem === item.id" @click="deleteCartItem(item.id)">
                刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
img{
  width: 100%;
  max-width: 150px;
  aspect-ratio: 1;
}
</style>