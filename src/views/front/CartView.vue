<script>
import { mapActions, mapState } from 'pinia';
import cartStore from '@/stores/cartStore';

import CartTable from '@/components/front/cart/CartTable.vue';
import CartList from '@/components/front/cart/CartList.vue'
import OrderForm from '@/components/front/cart/OrderForm.vue';

export default {
  components:{ CartTable, CartList, OrderForm },
  data() {
    return {
      code: '',
    }
  },
  computed: {
    ...mapState(cartStore,['cart', 'cartLoading', 'loadingItem']),
  },
  methods: {
    ...mapActions(cartStore,['getCarts', 'useCoupon'])
  }
}
</script>

<template>
  <div class="container-lg px-lg-5">
    <VLoading :active="cartLoading" />
    <template v-if="cart.carts?.length">
      <div class="bg-white px-lg-4">
        <h3 class="text-center text-theme h3 mb-4">購物車</h3>
        <!-- PC Table -->
        <div class="d-none d-sm-block">
          <CartTable :cart />
        </div>
        <!-- Mobile List -->
        <div class="d-sm-none">
          <CartList :cart/>
        </div>
      </div>
      <div class="bg-white mb-5 px-3 px-lg-4">
        <ul class="list-unstyled">
          <li class="d-flex">
            <div class="input-group mb-3 ms-auto" style="width: 250px">
              <input type="text" class="form-control" placeholder="優惠券代碼"
                aria-label="coupon" aria-describedby="coupon-button" v-model="code"/>
              <button class="btn btn-outline-theme" type="button" id="coupon-button" @click="useCoupon(`${code}`)">
                使用
              </button>
            </div>
          </li>
          <li>
            <template v-if="cart.carts[0].coupon">
              <div class="text-end">
                <span class="text-danger ms-2">已套用優惠券:{{ cart.carts[0]?.coupon.code }}</span>
              </div>
            </template>
          </li>
          <li class="d-flex border-bottom py-3">
            <div class="ms-auto d-flex justify-content-between" style="width: 300px">
              <span>總金額：</span>
              <span>{{ cart.total }}</span>
            </div>
          </li>
          <li class="d-flex border-bottom py-3">
            <div class="ms-auto d-flex justify-content-between" style="width: 300px">
              <span>付款金額：</span>
              <span>{{ cart.final_total }}</span>
            </div>
          </li>
        </ul>
      </div>
      <OrderForm />
    </template>
    <template v-else>
      <div class="text-center py-100">
        <h3 class="fs-2">目前購物車中沒有東西喔!!</h3>
        <p class="fs-4">趕快來看看有什麼好物吧!</p>
        <RouterLink to="/products" class="btn btn-lg btn-theme text-white">搶購去!</RouterLink>
      </div>
    </template>

  </div>
</template>

