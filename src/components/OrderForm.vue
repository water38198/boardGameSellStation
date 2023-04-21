<script>
import Swal from "sweetalert2";
import utilities from "../stores/utilities";
import { mapActions } from "pinia";

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    sentOrder() {
      const data = { user: this.user };
      this.$http
        .post(`${VITE_URL}/v2/api/${VITE_PATH}/order`, { data })
        .then((res) => {
          Swal.fire({
            title: res.data.message,
            html: `<div class='container'><div class="row text-start">
      <div class="col-4">
        <p class="text-theme">訂單ID:</p>
        <p class="text-theme">建立時間:</p>
        <p class="text-theme">總金額:</p>
      </div>
      <div class="col-8">
        <p>${res.data.orderId}</p>
        <p>${this.timeTransform(res.data.create_at)}</p>
        <p>$${res.data.total}</p>
      </div>
    </div></div>  
              `,
            confirmButtonColor: "#0FB99B",
          });
          this.getCarts();
          this.$refs.userForm.resetForm();
        })
        .catch((err) => {
          alert(err);
        });
    },
    isPhone(value) {
      //電話驗證
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "需要09開頭的手機號碼十碼";
    },
    ...mapActions(utilities, ["timeTransform"]),
  },
  props: ["getCarts", "cart"],
};
</script>

<template>
  <div class="bg-white">
    <h3 class="h3 text-center pt-5 text-theme">顧客資訊</h3>
    <div class="row justify-content-center">
      <div class="col-10 col-md-8 col-lg-6">
        <VForm
          v-slot="{ errors }"
          @submit="sentOrder"
          class="my-5"
          ref="userForm"
        >
          <div class="row">
            <div class="mb-3 col-md-6">
              <label for="name" class="h5">姓名:</label>
              <VField
                id="name"
                name="姓名"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['姓名'] }"
                placeholder="請輸入 姓名"
                rules="required"
                v-model="user.name"
              ></VField>
              <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-3 col-md-6">
              <label for="tel" class="h5">電話:</label>
              <VField
                id="tel"
                name="電話"
                type="tel"
                class="form-control"
                :class="{ 'is-invalid': errors['電話'] }"
                placeholder="請輸入 電話"
                :rules="isPhone"
                v-model="user.tel"
              ></VField>
              <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-3 col-md-6">
              <label for="email" class="h5">電子郵件:</label>
              <VField
                id="email"
                name="電子郵件"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['電子郵件'] }"
                placeholder="請輸入 電子郵件"
                rules="required||email"
                v-model="user.email"
              ></VField>
              <ErrorMessage
                name="電子郵件"
                class="invalid-feedback"
              ></ErrorMessage>
            </div>
            <div class="mb-3 col-md-6">
              <label for="address" class="h5">地址:</label>
              <VField
                id="address"
                name="地址"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['地址'] }"
                placeholder="請輸入 地址"
                rules="required"
                v-model="user.address"
              ></VField>
              <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-3">
              <label for="message" class="h5">附註（非必填）:</label>
              <VField
                id="message"
                name="附註"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['附註'] }"
                placeholder="請輸入 想給店家的話"
                v-model="user.message"
                as="textarea"
                cols="10"
                rows="5"
              ></VField>
              <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
            </div>
          </div>
          <div class="text-center">
            <button
              type="submit"
              class="btn btn-theme w-100 py-2 text-white"
              :disabled="!cart.carts?.length"
            >
              送出
            </button>
          </div>
        </VForm>
      </div>
    </div>
  </div>
</template>
