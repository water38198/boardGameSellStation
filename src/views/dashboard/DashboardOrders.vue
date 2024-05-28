<script>
import PaginationComponent from '@/components/PaginationComponent.vue';
import OrderModal from '@/components/dashboard/modal/OrderModal.vue';

import Swal from 'sweetalert2';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  components:{PaginationComponent,OrderModal},
  data() {
    return {
      orders: [],
      tempOrder: {},
      page: {},
      isLoading: false,
    }
  },
  methods: {
    async getOrders(page = 1) {
      this.isLoading = true;
      try {
        const res = await this.axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/admin/orders?page=${page}`);
        this.orders = res.data.orders;
        this.page = res.data.pagination;
      } catch (err) {
        Swal.fire({
          title: '錯誤發生',
          icon: 'error',
          text: `${err.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`,
        });
      } finally {
        this.isLoading = false;
      }
    },
    deleteOrder(order) {
      Swal.fire({
        title: `確定刪除嗎?`,
        icon: 'warning',
        text: `確定刪除訂單編號 ${order.id} 嗎？刪除後不可復原，確定嗎?`, showCancelButton: true,
        confirmButtonColor: 'hsl(0,85%,60%)',
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.isLoading = true;
          try {
            const res = await this.axios.delete(`${VITE_URL}/v2/api/${VITE_PATH}/admin/order/${order.id}`);
            Swal.fire({
              title: '刪除成功',
              icon: 'success',
              text: `${res.data.message}`,
              showConfirmButton: false,
              timer: 1000,
              didClose: () => {
                this.getOrders();
              }
            });
          } catch (err) {
            Swal.fire({
              title: '錯誤發生',
              icon: 'error',
              text: `${err.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`,
            });
          } finally {
            this.isLoading = false;
          }
        }
      })
    },
    editOrder(order) {
      this.tempOrder = order;
    }
  },
  mounted() {
    this.getOrders();
  }
}
</script>

<template>
  <VLoading :active="isLoading" />
    <div class="py-4">
    <h2 class="h2 text-center">訂單列表</h2>
    <div class="table-responsive">
      <table class="table table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">建立時間</th>
            <th scope="col">ID</th>
            <th scope="col">姓名</th>
            <th scope="col">付款狀態</th>
            <th scope="col" class="text-end">總金額</th>
            <th scope="col" class="text-center" style="width: 120px;">編輯</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="order in orders" :key="order.id">
            <td>{{ $timeTransform(order.create_at) }}</td>
            <td>{{ order.id }}</td>
            <td>{{ order.user.name }}</td>
            <td>
              <span v-if="order.is_paid" class="text-themeDark">已付款</span>
              <span v-else class="text-danger">未付款</span>
            </td>
            <td class="text-end">${{ order.total }}</td>
            <td>
              <button type="button" class="btn btn-outline-success btn-sm me-2"
              data-bs-toggle="modal" data-bs-target="#orderModal" @click="editOrder(order)">編輯</button>
              <button type="button" class="btn btn-outline-danger btn-sm"
                @click="deleteOrder(order)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
    <PaginationComponent :pages="page" @get-Method="getOrders"/>
    <OrderModal :temp-order="tempOrder" @get-orders="getOrders"/>
</template>

<style scoped lang="scss">
table{
  min-width: 750px;
}

</style>