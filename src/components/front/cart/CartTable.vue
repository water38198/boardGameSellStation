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
  <table v-if="cart" class="table mt-5 align-middle">
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
          <button type="button" class="btn btn-outline-danger btn-sm" :disabled="loadingItem === item.id" @click="deleteCartItem(item.id)">X</button>
        </td>
        <td class="text-center" style="width: 20%">
          <img :src="item.product.imageUrl" :alt="item.product.title + ' image'" class="cart-product-image"/>
        </td>
        <td>{{ item.product.title }}</td>
        <td>
          <select name="" class="form-select" v-model="item.qty" @change="updateItemNum(item)">
            <option :value="i" v-for="i in item.product.stock" :key="i + '123'">
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
          <button type="button" class="btn btn-outline-danger" :disabled="loadingItem === 'all'" @click="deleteCartAll()"> 清空全部 </button>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<style scoped lang="scss">
img{
  width: 150px;
  aspect-ratio: 1;
}
</style>