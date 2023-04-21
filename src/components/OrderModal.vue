<script>
import { mapActions } from "pinia";
import utilities from "../stores/utilities";
import Swal from "sweetalert2";

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  props: ["tempOrder", "closeModal", "getOrders"],
  data() {
    return {
      newOrder: {
        user: {},
        products: {},
      },
      loadingItem: "",
    };
  },
  methods: {
    deleteOrderItem(key) {
      if (Object.keys(this.newOrder.products).length === 1) {
        Swal.fire({
          icon: "error",
          title: "商品不得為空",
          showConfirmButton: false,
          timer: 1000,
        });
        return;
      }
      this.newOrder.total -= this.newOrder.products[key].final_total;
      delete this.newOrder.products[key];
    },
    updateOrder(order, id) {
      this.loadingItem = id;
      let changedOrder = { ...order };
      let orderData = {
        data: { ...changedOrder },
      };
      this.$http
        .put(`${VITE_URL}/v2/api/${VITE_PATH}/admin/order/${id}`, orderData)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "修改成功!",
            showConfirmButton: false,
            timer: 1000,
            didClose: () => {
              this.closeModal();
              this.getOrders();
              this.loadingItem = "";
            },
          });
        })
        .catch((err) => {
          alert(err);
        });
    },
    ...mapActions(utilities, ["timeTransform"]),
  },
  watch: {
    tempOrder() {
      this.newOrder = JSON.parse(JSON.stringify(this.tempOrder));
    },
  },
};
</script>

<template>
  <div
    class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable"
  >
    <div class="modal-content">
      <div class="modal-header bg-light">
        <h3 class="modal-title" id="orderModalLabel">訂單詳細內容</h3>
        <button
          type="button"
          class="btn-close"
          @click="closeModal()"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body px-5">
        <VForm
          v-slot="{ errors }"
          id="OrderModal"
          class="row g-3"
          @submit="updateOrder(newOrder, newOrder.id)"
        >
          <h5 class="h5 fw-bold">基本資訊</h5>
          <div class="col-4">
            <div class="input-group mb-3">
              <span class="input-group-text" id="create_at">建立時間</span>
              <input
                type="text"
                class="form-control"
                aria-label="createdTime"
                aria-describedby="create_at"
                disabled
                :value="timeTransform(newOrder.create_at)"
              />
            </div>
          </div>
          <div class="col-4">
            <div class="input-group mb-3">
              <span class="input-group-text" id="id">ID</span>
              <input
                type="text"
                class="form-control"
                aria-label="ID"
                aria-describedby="id"
                disabled
                :value="newOrder.id"
              />
            </div>
          </div>
          <div class="col-4">
            <span class="me-2">付款狀態: </span>
            <input
              type="checkbox"
              class="btn-check"
              id="btn-check-outlined"
              autocomplete="off"
              v-model="newOrder.is_paid"
            />
            <label
              class="btn"
              for="btn-check-outlined"
              :class="{
                'btn-outline-success': newOrder.is_paid,
                'btn-outline-danger': !newOrder.is_paid,
              }"
              ><span v-if="newOrder.is_paid">已付款 </span>
              <span v-else>尚未付款 </span>
            </label>
          </div>
          <h5 class="h5 fw-bold">訂購商品資訊</h5>
          <div class="col-12">
            <table class="table align-middle">
              <thead>
                <tr>
                  <th></th>
                  <th>商品名稱</th>
                  <th>數量</th>
                  <th class="text-end">單價</th>
                  <th class="text-end">總價</th>
                </tr>
              </thead>
              <tbody v-if="newOrder.products">
                <tr v-for="(product, key) in newOrder.products" :key="key">
                  <td>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click="deleteOrderItem(key)"
                    >
                      X
                    </button>
                  </td>
                  <td>{{ product.product.title }}</td>
                  <td>{{ product.qty }}</td>
                  <td class="text-end">{{ product.product.price }}</td>
                  <td class="text-end">{{ product.final_total }}</td>
                </tr>
              </tbody>
            </table>
            <p class="text-end pe-2">總金額:$ {{ newOrder.total }}</p>
          </div>
          <h5 class="fw-bold">訂購人資訊</h5>
          <div class="col-4">
            <label for="username" class="form-label">訂購人姓名:</label>
            <VField
              id="username"
              name="訂購人姓名"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['訂購人姓名'] }"
              placeholder="請輸入 訂購人姓名"
              rules="required"
              v-model="newOrder.user.name"
            ></VField>
            <ErrorMessage
              name="訂購人姓名"
              class="invalid-feedback"
            ></ErrorMessage>
          </div>
          <div class="col-4">
            <label for="email" class="form-label">訂購人Email:</label>
            <VField
              id="email"
              name="訂購人Email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['訂購人Email'] }"
              placeholder="請輸入 訂購人Email"
              rules="required"
              v-model="newOrder.user.email"
            ></VField>
            <ErrorMessage
              name="訂購人Email"
              class="invalid-feedback"
            ></ErrorMessage>
          </div>
          <div class="col-4">
            <label for="tel" class="form-label">訂購人電話:</label>
            <VField
              id="tel"
              name="訂購人電話"
              type="tel"
              class="form-control"
              :class="{ 'is-invalid': errors['訂購人電話'] }"
              placeholder="請輸入 訂購人電話"
              rules="required"
              v-model="newOrder.user.tel"
            ></VField>
            <ErrorMessage
              name="訂購人電話"
              class="invalid-feedback"
            ></ErrorMessage>
          </div>
          <div class="col-6">
            <label for="address" class="form-label">訂購人地址:</label>
            <VField
              id="address"
              name="訂購人地址"
              type="address"
              class="form-control"
              :class="{ 'is-invalid': errors['訂購人地址'] }"
              placeholder="請輸入 訂購人地址"
              rules="required"
              v-model="newOrder.user.address"
            ></VField>
            <ErrorMessage
              name="訂購人Email"
              class="invalid-feedback"
            ></ErrorMessage>
          </div>
          <div class="col-12">
            <label for="message" class="form-label">留言備註</label>
            <textarea
              name=""
              id="message"
              cols="20"
              rows="5"
              v-model="newOrder.user.message"
              class="form-control"
            ></textarea></div
        ></VForm>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="closeModal()">
          取消
        </button>
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="loadingItem === newOrder.id"
          form="OrderModal"
        >
          確認
        </button>
      </div>
    </div>
  </div>
</template>
