<script>
import Swal from 'sweetalert2';

const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      user: {},
      isLoading: false,
    };
  },
  methods: {
    login() {
      this.isLoading = true;
      this.$http
        .post(`${VITE_URL}/v2/admin/signin`, {
          username: this.user.account,
          password: this.user.password,
        })
        .then((res) => {
          const { expired, token } = res.data;
          document.cookie = `myToken=${token}; expires=${new Date(expired)}`;
          Swal.fire({
            icon: 'success',
            title: '登入成功',
            showConfirmButton: false,
            timer: 1000,
            didClose: () => {
              this.$router.push('/admin/products');
            },
          });
        })
        .catch((err) => {
          Swal.fire({
            title: '錯誤發生',
            icon: 'error',
            text: `${err.response?.data?.message || '登入失敗'}`,
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    check() {
      this.isLoading = true;
      const myToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('myToken='))
        ?.split('=')[1];
      this.$http.defaults.headers.common.Authorization = myToken;
      this.$http
        .post(`${VITE_URL}/v2/api/user/check`)
        .then((res) => {
          if (res.data.success) {
            Swal.fire({
              icon: 'success',
              title: '已登入',
              timer: 2000,
              showConfirmButton: false,
              didClose: () => {
                this.$router.push('/admin/products');
              },
            });
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.check();
  },
};
</script>

<template>
  <VLoading :active="isLoading" />
  <div class="container min-vh-100 pt-100">
    <div class="row justify-content-center pt-5">
      <div class="col-8 col-md-6 col-lg-4">
        <h2 class="text-center">登入</h2>
        <VForm v-slot="{ errors }" @submit="login" class="my-5">
          <div class="mb-3">
            <label for="account" class="h5">帳號:</label>
            <VField id="account" name="帳號" type="text"
              class="form-control" :class="{ 'is-invalid': errors['帳號'] }"
              placeholder="請輸入 帳號" rules="required|email" v-model="user.account"></VField>
            <ErrorMessage name="帳號" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-4">
            <label for="password" class="h5">密碼:</label>
            <VField id="password" name="密碼" type="password"
              class="form-control" :class="{ 'is-invalid': errors['密碼'] }"
              placeholder="請輸入 密碼" rules="required" v-model="user.password">
            </VField>
            <ErrorMessage name="密碼" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-theme text-white w-100 py-2" :disabled="isLoading">
              登入
            </button>
          </div>
        </VForm>
      </div>
    </div>
  </div>
</template>
