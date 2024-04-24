import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default defineStore('cartStore', {
  state: () => ({
    cart: [],
    cartLoading: false,
    loadingItem: '',
    coupon: '',
  }),
  actions: {
    getCarts() {
      this.cartLoading = true;
      axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/cart`).then((res) => {
        this.cart = res.data.data;
        this.cartLoading = false;
      });
    },
    addToCart(product, qty = 1) {
      this.loadingItem = product.id;
      const data = { product_id: product.id, qty };
      // 找到購物車裡面的相同產品
      const addedProduct = this.cart.carts.find(
        (el) => el.product_id === product.id,
      );
      // 如果有相同產品
      if (addedProduct) {
        // 如果庫存少於 新加入的數量+原本購物車內的數量
        if (addedProduct.product.stock < addedProduct.qty + qty) {
          // 通知超出數量
          Swal.fire({
            title: '出超庫存數量',
            icon: 'error',
            confirmButtonColor: '#0FB99B',
          });
          this.loadingItem = '';
          return;
        }
      }
      this.loadingItem = product.id;
      axios
        .post(`${VITE_URL}/v2/api/${VITE_PATH}/cart`, { data })
        .then(() => {
          this.getCarts();
          this.loadingItem = '';
          Swal.fire({
            position: 'bottom-right',
            icon: 'success',
            title: '成功加入購物車!',
            showConfirmButton: false,
            toast: true,
            timer: 1500,
          });
        })
        .catch((err) => {
          Swal.fire({
            title: '錯誤發生',
            icon: 'error',
            text: `${err.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`,
          });
        });
    },
    updateItemNum(item) {
      const data = {
        product_id: item.product.id,
        qty: item.qty,
      };
      axios
        .put(`${VITE_URL}/v2/api/${VITE_PATH}/cart/${item.id}`, {
          data,
        })
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: '更新成功',
            showConfirmButton: false,
            timer: 1500,
            didClose: () => {
              this.getCarts();
            },
          });
        })
        .catch((err) => {
          Swal.fire({
            title: '錯誤發生',
            icon: 'error',
            text: `${err.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`,
          });
        });
    },
    deleteCartItem(id) {
      this.loadingItem = id;
      axios
        .delete(`${VITE_URL}/v2/api/${VITE_PATH}/cart/${id}`)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: '刪除成功',
            showConfirmButton: false,
            timer: 1500,
            didClose: () => {
              this.getCarts();
            },
          });
        })
        .catch((err) => {
          Swal.fire({
            title: '錯誤發生',
            icon: 'error',
            text: `${err.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`,
          });
        });
    },
    deleteCartAll() {
      this.loadingItem = 'all';
      Swal.fire({
        title: '確定嗎?',
        text: '你確定要清空購物車嗎?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0FB99B',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        didClose: () => {
          this.loadingItem = '';
        },
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${VITE_URL}/v2/api/${VITE_PATH}/carts`)
            .then(() => {
              Swal.fire('刪除成功!', '購物車已清空', 'success');
              this.getCarts();
            })
            .catch((err) => {
              Swal.fire({
                title: '錯誤發生',
                icon: 'error',
                text: `${err.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`,
              });
            });
        }
      });
    },
  },
});
