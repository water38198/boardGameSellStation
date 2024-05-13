<script>
import PaginationComponent from '@/components/PaginationComponent.vue';
import OrderModal from '@/components/dashboard/OrderModal.vue';
import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';

const { VITE_URL, VITE_PATH } = import.meta.env;
// let orderModal = {};

export default {
  data() {
    return {
      orders: [],
      tempOrder: {},
      page: {},
      isLoading: false,
      orderModal: {},
    };
  },
  components: { PaginationComponent, OrderModal },
  methods: {
    getOrders(page = 1) {
      this.isLoading = true;
      this.$http
        .get(`${VITE_URL}/v2/api/${VITE_PATH}/admin/orders?page=${page}`)
        .then((res) => {
          this.orders = res.data.orders;
          this.page = res.data.pagination;
        })
        .catch((err) => {
          Swal.fire({
            title: '錯誤發生',
            icon: 'error',
            text: `${err.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`,
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    openModal(order) {
      this.tempOrder = { ...order };
      this.orderModal.show();
    },
    closeModal() {
      this.tempOrder = {
        user: {},
        products: {},
      };
      this.orderModal.hide();
    },
    deleteOrder(order) {
      Swal.fire({
        title: `確定刪除 ${order.id} 嗎?`,
        text: '刪除後不可復原，確定嗎',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: '確定',
        cancelButtonColor: '#d33',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.isConfirmed) {
          this.isLoading = true;
          this.$http
            .delete(`${VITE_URL}/v2/api/${VITE_PATH}/admin/order/${order.id}`)
            .then(() => {
              this.isLoading = false;
              Swal.fire({
                icon: 'success',
                title: '訂單刪除成功',
                showConfirmButton: false,
                timer: 1000,
                didClose: () => {
                  this.getOrders();
                },
              });
            });
        }
      });
    },
  },
  mounted() {
    this.getOrders();
    // Modal建立
    this.orderModal = new bootstrap.Modal('#orderModal');
  },
};
</script>

<template>
  <!-- Loading Layout -->
  <div class="vl-parent">
    <VLoading v-model:active="isLoading" />
  </div>
  <div class="row justify-content-center">
    <div class="col">
      <h2 class="h2 text-center">訂單</h2>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">建立時間</th>
            <th scope="col">ID</th>
            <th scope="col">姓名</th>
            <th scope="col">付款狀態</th>
            <th scope="col">總金額</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="orders">
            <tr v-for="order in orders" :key="order.id">
              <td>
                {{ this.$timeTransform(order.create_at * 1000) }}
              </td>
              <td>{{ order.id }}</td>
              <td>{{ order.user.name }}</td>
              <td>
                <span class="text-success" v-if="order.is_paid">已付款</span>
                <span class="text-danger" v-else>未付款</span>
              </td>
              <td>{{ order.total }}</td>
              <td>
                <button type="button" class="btn btn-outline-primary btn-sm me-2"
                @click="openModal(order)">編輯</button>
                <button type="button" class="btn btn-outline-danger btn-sm"
                  @click="deleteOrder(order)">刪除</button>
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="6" class="text-center">
              本頁有{{ orders.length }}項訂單
            </td>
          </tr>
        </tfoot>
      </table>
      <PaginationComponent :pages="page" @get-Method="getOrders"></PaginationComponent>
    </div>
  </div>
  <!-- orderModal -->
    <OrderModal :temp-Order="tempOrder" @close-Modal="closeModal" @get-Orders="getOrders">
    </OrderModal>
</template>
