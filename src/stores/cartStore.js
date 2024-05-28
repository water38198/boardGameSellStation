import { defineStore, } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';
import useTimeTransform from '@/composables/timeTransform.js'

const { VITE_URL, VITE_PATH } = import.meta.env;
const { timeTransform } = useTimeTransform();

export default defineStore('cartStore', {
  state: () => ({
    cart: [],
    cartLoading: false,
    loadingItem: '',
    coupon: '',
  }),
  actions: {
    async getCarts() {
      this.cartLoading = true;
      try {
        const res = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/cart`);
        this.cart = res.data.data;
      } catch (err) {
        Swal.fire({
          title: '錯誤發生',
          icon: 'error',
          text: `${err.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`,
        });
      } finally {
        this.cartLoading = false;
      }
    },
    async addToCart(product, qty = 1) {
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
      try {
        const res = await axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/cart`, { data });
        Swal.fire({
          position: 'bottom-right',
          icon: 'success',
          title: `${res.data.message}`,
          showConfirmButton: false,
          toast: true,
          timer: 1500,
        });
      } catch (err) {
        Swal.fire({
          title: '錯誤發生',
          icon: 'error',
          text: `${err.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`,
        });
      } finally {
        this.getCarts();
        this.loadingItem = '';
      }
    },
    async updateItemNum(item) {
      this.cartLoading = true;
      const data = {
        product_id: item.product.id,
        qty: item.qty,
      };
      try {
        const res = await axios.put(`${VITE_URL}/v2/api/${VITE_PATH}/cart/${item.id}`, { data })
        this.cartLoading = false;
        Swal.fire({
          icon: 'success',
          title: `${res.data.message}`,
          showConfirmButton: false,
          timer: 1500,
          didClose: () => {
            this.getCarts();
          },
        });
      } catch (err) {
        Swal.fire({
          title: '錯誤發生',
          icon: 'error',
          text: `${err.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`,
        });
      } finally {
        this.cartLoading = false;
      }
    },
    deleteCartItem(id) {
      this.loadingItem = id;
      Swal.fire({
        icon: 'question',
        title: '確定要刪除嗎',
        showCancelButton: true,
        confirmButtonText: "確定刪除",
        confirmButtonColor: 'red',
        cancelButtonText: "我再想想",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await axios.delete(`${VITE_URL}/v2/api/${VITE_PATH}/cart/${id}`);
            Swal.fire({
              icon: 'success',
              title: `${res.data.message}`,
              showConfirmButton: false,
              timer: 1500,
              didClose: () => {
                this.getCarts();
              }
            })
          } catch (err) {
            Swal.fire({
              title: '錯誤發生',
              icon: 'error',
              text: `${err.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`,
            })
          }
        }
      })
    },
    deleteCartAll() {
      this.loadingItem = 'all';
      Swal.fire({
        title: '確定嗎?',
        text: '你確定要清空購物車嗎?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
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
    useCoupon(code) {
      const data = { data: { code } };
      axios
        .post(`${VITE_URL}/v2/api/${VITE_PATH}/coupon`, data)
        .then(() => {
          this.getCarts();
        })
        .catch(() => Swal.fire({
          icon: 'error',
          title: '哇...',
          text: '優惠券代碼錯誤!請確認',
        }));
    },
    sendOrder(user) {
      const data = { user };
      axios
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
        <p>${timeTransform(res.data.create_at)}</p>
        <p>$${res.data.total}</p>
      </div>
    </div></div>  
              `,
            confirmButtonColor: '#0FB99B',
          });
          this.getCarts();
        })
        .catch((err) => {
          Swal.fire({
            title: '錯誤發生',
            icon: 'error',
            text: `${err.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`,
          });
        });
    },
  },
});
