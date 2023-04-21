<script>
import PaginationComponent from "@/components/PaginationComponent.vue";
import CouponModal from "@/components/CouponModal.vue";
import { mapActions } from "pinia";
import utilities from "@/stores/utilities";
import * as bootstrap from "bootstrap";
import Swal from "sweetalert2";

const { VITE_URL, VITE_PATH } = import.meta.env;
let couponModal = {};

export default {
  components: { PaginationComponent, CouponModal },
  data() {
    return {
      coupons: [],
      page: {},
      isNew: true,
      tempCoupon: {},
      isLoading: false,
    };
  },
  methods: {
    getCoupons(page = 1) {
      this.isLoading = true;
      this.$http
        .get(`${VITE_URL}/v2/api/${VITE_PATH}/admin/coupons?page=${page}`)
        .then((res) => {
          this.coupons = res.data.coupons;
          this.page = res.data.pagination;
        })
        .catch((err) => {
          alert(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    openModal(status, coupon) {
      if (status === "new") {
        this.isNew = true;
        this.tempCoupon = {};
      } else if (status === "edit") {
        this.isNew = false;
        this.tempCoupon = { ...coupon };
      }
      couponModal.show();
    },
    closeModal() {
      couponModal.hide();
      this.tempCoupon = {};
    },
    ...mapActions(utilities, ["timeTransform"]),
    deleteCoupon(coupon) {
      Swal.fire({
        title: `確定刪除 ${coupon.title} 嗎?`,
        text: "刪除後不可復原，確定嗎",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "確定",
        cancelButtonColor: "#d33",
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.isConfirmed) {
          this.isLoading = true;
          this.$http
            .delete(`${VITE_URL}/v2/api/${VITE_PATH}/admin/coupon/${coupon.id}`)
            .then(() => {
              this.isLoading = false;
              Swal.fire({
                icon: "success",
                title: `優惠券刪除成功`,
                showConfirmButton: false,
                timer: 1000,
                didClose: () => {
                  this.getCoupons();
                },
              });
            })
            .catch((err) => {
              alert(err);
            });
        }
      });
    },
  },
  mounted() {
    const myToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("myToken="))
      ?.split("=")[1];
    this.$http.defaults.headers.common["Authorization"] = myToken;
    couponModal = new bootstrap.Modal("#couponModal");
    this.getCoupons();
  },
};
</script>

<template>
  <!-- Loading Layout -->
  <div class="vl-parent">
    <VLoading
      v-model:active="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    />
  </div>
  <h2 class="text-center">優惠券</h2>
  <div class="text-end">
    <button type="button" class="btn btn-primary" @click="openModal('new')">
      建立優惠券
    </button>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">名稱</th>
        <th scope="col">是否啟用</th>
        <th scope="col">比例</th>
        <th scope="col">到期日</th>
        <th scope="col">折扣碼</th>
        <th scope="col">管理</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="coupons.length">
        <tr v-for="coupon in coupons" :key="coupon.id">
          <td>{{ coupon.title }}</td>
          <td>
            <span class="text-success" v-if="coupon.is_enabled">啟用</span>
            <span class="text-danger" v-else>未啟用</span>
          </td>
          <td>{{ coupon.percent }}</td>
          <td>{{ timeTransform(coupon.due_date) }}</td>
          <td>{{ coupon.code }}</td>
          <td>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm me-2"
              @click="openModal('edit', coupon)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="deleteCoupon(coupon)"
            >
              刪除
            </button>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <PaginationComponent
    :pages="page"
    :get-Method="getCoupons"
  ></PaginationComponent>
  <!-- couponModal -->
  <div
    class="modal fade"
    id="couponModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="couponModalLabel"
    aria-hidden="true"
  >
    <CouponModal
      :is-new="isNew"
      :temp-Coupon="tempCoupon"
      :close-modal="closeModal"
      :get-coupons="getCoupons"
    ></CouponModal>
  </div>
</template>
