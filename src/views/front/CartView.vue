<script>
import OrderForm from "@/components/OrderForm.vue";
import cartStore from "@/stores/cartStore";
import { mapState, mapActions } from "pinia";
import Swal from "sweetalert2";

const { VITE_URL, VITE_PATH } = import.meta.env;

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
    ]),
    useCoupon(code) {
      const data = { data: { code } };
      this.$http
        .post(`${VITE_URL}/v2/api/${VITE_PATH}/coupon`, data)
        .then(() => {
          this.getCarts();
        })
        .catch(() =>
          Swal.fire({
            icon: "error",
            title: "哇...",
            text: "優惠券代碼錯誤!請確認",
          })
        );
    },
  },
  components: { OrderForm },
};
</script>

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
      <div class="bg-white px-3 px-lg-4">
        <h3 class="pt-5 text-center text-theme h3">購物車</h3>
        <div class="d-none d-md-block">
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
                <td style="width: 50px">
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
        <!-- 購物車RWD -->
        <ul class="d-md-none list-unstyled">
          <li class="card mb-3" v-for="item in cart.carts" :key="item.id">
            <div class="row g-0">
              <div class="col-6">
                <img
                  :src="item.product.imageUrl"
                  class="rounded-start"
                  :alt="item.product.title + ' image'"
                  style="width: 100%; height: 200px; object-fit: cover"
                />
              </div>
              <div class="col-6">
                <div class="p-2 d-flex flex-column h-100">
                  <h5 class="card-title h6">{{ item.product.title }}</h5>
                  <div class="card-text">
                    <span class="mb-2">數量：</span>
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
                  </div>
                  <div class="card-text">
                    <small>單價：{{ item.product.price }}</small>
                  </div>
                  <div class="card-text fs-6">小計：{{ item.final_total }}</div>
                  <div class="mt-auto">
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      :disabled="loadingItem === item.id"
                      @click="deleteCartItem(item.id)"
                    >
                      刪除
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="bg-white mb-5 px-3 px-lg-4">
        <ul class="list-unstyled">
          <li class="d-flex">
            <div class="input-group mb-3 ms-auto" style="width: 250px">
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
          </li>
          <li>
            <template v-if="cart.carts[0].coupon">
              <div class="text-end">
                <span class="text-danger ms-2"
                  >已套用優惠券:{{ cart.carts[0]?.coupon.code }}</span
                >
              </div></template
            >
          </li>
          <li class="d-flex border-bottom py-3">
            <div
              class="ms-auto d-flex justify-content-between"
              style="width: 300px"
            >
              <span>總金額：</span>
              <span>{{ cart.total }}</span>
            </div>
          </li>
          <li class="d-flex border-bottom py-3">
            <div
              class="ms-auto d-flex justify-content-between"
              style="width: 300px"
            >
              <span>付款金額：</span>
              <span>{{ cart.final_total }}</span>
            </div>
          </li>
        </ul>
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

<style scoped>
.cart-product-image {
  width: 100%;
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
