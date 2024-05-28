<script>
import PaginationComponent from '@/components/PaginationComponent.vue';
import CouponModal from '@/components/dashboard/modal/CouponModal.vue';
import Swal from 'sweetalert2';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  components: { PaginationComponent, CouponModal },
  data() {
    return {
      coupons: [],
      page: {},
      isNew: true,
      tempCoupon: {},
      isLoading:false,
    }
  },
  methods: {
    async getCoupons(page = 1) {
      this.isLoading = true;
      try {
        const res = await this.axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/admin/coupons?page=${page}`);
        this.coupons = res.data.coupons;
        this.page = res.data.pagination;
      } catch (err) {
        Swal.fire({
          title: '錯誤發生',
          icon: 'error',
          text: `${err.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`,
        });
      } finally {
        this.isLoading = false;
      }
    },
    addNewCoupon() {
      this.isNew = true;
      this.tempCoupon = {};
    },
    editCoupon(coupon) {
      this.isNew = false;
      this.tempCoupon = { ...coupon };
    },
    deleteCoupon(coupon) {
      Swal.fire({
        title: `確定要刪除${coupon.title}嗎`,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '確定',
        confirmButtonColor: 'hsl(0,85%,70%)',
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.isLoading = true;
          try {
            const res = await this.axios.delete(`${VITE_URL}/v2/api/${VITE_PATH}/admin/coupon/${coupon.id}`);
            Swal.fire({
              title:'刪除成功',
              icon: 'success',
              text:`${res.data.message}`,
              showConfirmButton: false,
              timer: 1000,
              didClose: () => {
                this.getCoupons();
              }
            })
          } catch (err) {
            Swal.fire({
              title: '錯誤發生',
              icon: 'error',
              text: `${err.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`,
            });
          } finally {
            this.isLoading = false;
          }
        }
      })
    }
  },
  mounted() {
    this.getCoupons();
  }
}
</script>

<template>
  <VLoading :active="isLoading"/>
  <div class="py-4">
    <h2 class="h2 text-center">優惠券列表</h2>
    <div class="text-end mb-4">
      <button type="button" class="btn btn-themeDark" data-bs-toggle="modal" data-bs-target="#couponModal" @click="addNewCoupon">建立新優惠券</button>
    </div>
  </div>
  <div class="table-responsive">
    <table class="table table-hover align-middle">
      <thead>
        <tr>
          <th scope="col">名稱</th>
          <th scope="col">啟用</th>
          <th scope="col">比例</th>
          <th scope="col">到期日</th>
          <th scope="col">折扣碼</th>
          <th scope="col" width="120px">管理</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coupon in coupons" :key="coupon.id">
          <td>{{ coupon.title }}</td>
          <td>
            <span class="text-success" v-if="coupon.is_enabled">啟用</span>
            <span class="text-danger" v-else>關閉</span>
          </td>
          <td>{{ coupon.percent }}</td>
          <td>{{ $timeTransform(coupon.due_date) }}</td>
          <td>{{ coupon.code }}</td>
          <td>
            <button class="btn btn-outline-themeDark btn-sm me-2" type="button" data-bs-toggle="modal" data-bs-target="#couponModal" @click="editCoupon(coupon)">編輯</button>  
            <button class="btn btn-outline-danger btn-sm" type="button" @click="deleteCoupon(coupon)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <PaginationComponent v-if="page.total_page>1" :pages="page" @get-Method="getCoupons" />
  <CouponModal :is-new="isNew" :temp-coupon="tempCoupon" @get-coupons="getCoupons"/>
</template>