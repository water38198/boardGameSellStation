<script>
import Swal from 'sweetalert2';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar.vue';

const { VITE_URL } = import.meta.env;

export default {
  components: { DashboardNavbar },
  data() {
    return {
      isChecked: false,
      isLoading: false,
    }
  },
  methods: {
    async loginCheck() {
      this.isLoading = true;
      const myToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('myToken='))
        ?.split('=')[1];
      this.axios.defaults.headers.common.Authorization = myToken;
      try {
        const res = await this.axios.post(`${VITE_URL}/v2/api/user/check`);
        this.isChecked = true;
        if (!res.data.success) {
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
        Swal.fire({
          title: '錯誤發生',
          icon: 'error',
          text: `${err.response.data.message}`,
          didClose: () => {
            this.$router.push('/login');
          }
        });
        
      } finally {
        this.isLoading = false;
      }
    }
  },
  mounted() {
    this.loginCheck();
  }
}
</script>


<template>
  <div>
    <VLoading :active="isLoading"/>
    <h1 class="text-center">後台</h1>
    <hr>
    <DashboardNavbar></DashboardNavbar>
    <hr>
    <div class="container-lg">
      <RouterView v-if="isChecked" />
    </div>
  </div>
</template>