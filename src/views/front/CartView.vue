<template>
  <!-- Loading Layout -->
  <div class="vl-parent">
    <VLoading
      v-model:active="cartLoading"
      :can-cancel="false"
      :is-full-page="true"
    />
  </div>
  <div class="container-lg px-lg-5">
    <template v-if="cart.carts?.length">
      <div class="bg-white">
        <h3 class="pt-5 text-center text-theme h3">購物車</h3>
        <table class="table mt-5 align-middle">
          <thead>
            <tr>
              <th></th>
              <th class="text-center">商品圖片</th>
              <th>商品名稱</th>
              <th>數量/單位</th>
              <th class="text-end">單價</th>
              <th class="text-end">總價</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td class="text-center">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  :disabled="loadingItem === item.id"
                  @click="deleteCartItem(item.id)"
                >
                  X
                </button>
              </td>
              <td class="text-center" style="width: 20%">
                <img
                  :src="item.product.imageUrl"
                  :alt="item.product.title + ' image'"
                  class="cart-product-image"
                />
              </td>
              <td>{{ item.product.title }}</td>
              <td>
                <select
                  name=""
                  id=""
                  class="form-select"
                  v-model="item.qty"
                  @change="updateItemNum(item)"
                >
                  <option
                    :value="i"
                    v-for="i in item.product.stock"
                    :key="i + '123'"
                  >
                    {{ i }}
                  </option>
                </select>
              </td>
              <td class="text-end">{{ item.product.price }}</td>
              <td class="text-end">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr v-if="cart.carts?.length">
              <td class="text-end" colspan="7">
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  :disabled="loadingItem === 'all'"
                  @click="deleteCartAll()"
                >
                  清空全部
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="bg-white mb-5">
        <table class="table align-middle">
          <tbody>
            <tr>
              <td class="text-theme fs-1"></td>
              <td style="min-width: 250px; width: 25%">
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="優惠券代碼"
                    aria-label="coupon"
                    aria-describedby="coupon-button"
                    v-model="code"
                  />
                  <button
                    class="btn btn-outline-theme"
                    type="button"
                    id="coupon-button"
                    @click="useCoupon(`${code}`)"
                  >
                    使用
                  </button>
                </div>
                <template v-if="cart.carts[0].coupon">
                  <div>
                    <span class="text-danger ms-2"
                      >已套用優惠券:{{ cart.carts[0]?.coupon.code }}</span
                    >
                  </div></template
                >
              </td>
            </tr>
            <tr class="text-end">
              <td>總金額</td>
              <td>{{ cart.total }}</td>
            </tr>
            <tr class="text-end">
              <td>優惠券折扣</td>
              <td>
                <span class="text-danger">{{
                  cart.final_total - cart.total
                }}</span>
              </td>
            </tr>
            <tr class="text-end">
              <td>付款金額</td>
              <td class="text-theme fs-2">{{ cart.final_total }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template v-else>
      <div class="mt-5 py-5 text-center">
        <h4 class="fs-2">目前購物車中沒有東西喔!!</h4>
        <p class="fs-4">趕快來看看有什麼好物吧!</p>
        <RouterLink to="/products" class="btn btn-lg btn-theme"
          >搶購去!</RouterLink
        >
      </div>
    </template>
    <template v-if="cart.carts?.length">
      <OrderForm :cart="cart" :get-Carts="getCarts"></OrderForm>
    </template>
  </div>
</template>

<script>
import OrderForm from "@/components/OrderForm.vue";
import cartStore from "@/stores/cartStore";
import { mapState, mapActions } from "pinia";

export default {
  data() {
    return {
      code: "",
    };
  },
  computed: {
    ...mapState(cartStore, ["cart", "cartLoading", "loadingItem"]),
  },
  methods: {
    ...mapActions(cartStore, [
      "updateItemNum",
      "deleteCartItem",
      "deleteCartAll",
      "getCarts",
      "useCoupon",
    ]),
  },
  components: { OrderForm },
};
</script>
<style>
.cart-product-image {
  width: 200px;
  height: 150px;
  object-fit: contain;
}
@media (max-width: 768px) {
  .cart-product-image {
    width: 150px;
    height: 100px;
  }
}
</style>
