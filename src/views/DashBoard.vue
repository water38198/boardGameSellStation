<script>
import Swal from 'sweetalert2';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar.vue';

const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      isChecked: false,
      isLoading: false,
    };
  },
  components: {
    DashboardNavbar,
  },
  methods: {
    logout() {
      document.cookie = 'myToken=; expires=';
      this.$router.push('/login');
    },
    loginCheck() {
      this.isLoading = true;
      const myToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('myToken='))
        ?.split('=')[1];
      // axios header
      this.$http.defaults.headers.common.Authorization = myToken;
      this.$http
        .post(`${VITE_URL}/v2/api/user/check`)
        .then((res) => {
          this.isChecked = true;
          if (!res.data.success) {
            this.$router.push('/login');
          }
        })
        .catch((err) => {
          Swal.fire({
            title: '錯誤發生',
            icon: 'error',
            text: `${err.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`,
          });
          this.$router.push('/login');
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.loginCheck();
  },
};
</script>

<template>
  <VLoading :active="isLoading" />
  <h1 class="text-center">後台</h1>
  <hr />
  <DashboardNavbar @logout="logout"/>
  <hr />
  <div class="container">
    <RouterView v-if="isChecked" />
  </div>
</template>
