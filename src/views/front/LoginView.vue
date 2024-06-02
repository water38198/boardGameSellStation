<script>
import Swal from 'sweetalert2';

const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      user: {},
      isLoading : false,
    }
  },
  methods: {
    async login() {
      this.isLoading = true;
      try {
        const res = await this.axios.post(`${VITE_URL}/v2/admin/signin`, {
          username: this.user.account,
          password: this.user.password,
        });
        const { expired, token } = res.data;
        document.cookie = `myToken=${token}; expires=${new Date(expired)}`;
        Swal.fire({
          icon: 'success',
          title: '登入成功',
          showConfirmButton: false,
          timer: 1000,
          didClose: () => {
            this.$router.push('/dashboard');
          },
        });
      } catch (err) {
          Swal.fire({
            title: '錯誤發生',
            icon: 'error',
            text: `${err.response?.data?.message || '登入失敗'}`,
          });
      } finally {
        this.isLoading = false;
      }
    },
    async loginCheck() {
      this.isLoading = true;
      const myToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('myToken='))
        ?.split('=')[1];
      this.axios.defaults.headers.common.Authorization = myToken;
      try {
        const res = await this.axios.post(`${VITE_URL}/v2/api/user/check`);
        if (res.data.success) {
          Swal.fire({
            title: '錯誤發生',
            icon: 'error',
            text: '請重新登入',
            didClose: () => {
              this.$router.push('/login');
            }
          })
        }
      } catch (err) {
        document.cookie = 'myToken=; expires=';
      } finally {
        this.isLoading = false;
      }
    }
  },
  mounted() {
    this.loginCheck();
  },
}
</script>

<template>
  <div class="container pt-100">
    <VLoading :active="isLoading" />
    <div class="row justify-content-center pt-5">
      <div class="col-8 col-md-6 col-lg-4">
        <h2 class="text-center">登入</h2>
        <VForm v-slot="{ errors }" @submit="login" class="my-5">
          <div class="form-floating mb-3">
            <VField id="account" name="帳號" type="text"
              class="form-control" :class="{ 'is-invalid': errors['帳號'] }"
              placeholder="請輸入 帳號" rules="required|email" v-model="user.account" autocomplete="off" aria-autocomplete="none"></VField>
            <label for="account" class="h5 bg-transparent">帳號:</label>
            <ErrorMessage name="帳號" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="form-floating mb-4">
            <VField id="password" name="密碼" type="password"
              class="form-control" :class="{ 'is-invalid': errors['密碼'] }"
              placeholder="請輸入 密碼" rules="required" v-model="user.password">
            </VField>
            <label for="password" class="h5">密碼:</label>
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