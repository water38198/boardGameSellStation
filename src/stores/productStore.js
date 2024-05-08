import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default defineStore('productStore', {
  state: () => ({
    products: [],
    isLoading: false,
  }),
  actions: {
    getProducts(page = 1) {
      this.isLoading = true;
      axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/products?page=${page}`)
        .then((res) => {
          this.products = res.data.products;
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
  },
});
