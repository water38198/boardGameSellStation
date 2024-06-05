<script>
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  props: {
    isNew: {
      type: Boolean,
    },
    tempCoupon: {
      type: Object,
    }
  },
  data() {
    return {
      modalCoupon: {},
      isLoading: false,
      modal:null
    }
  },
  methods: {
    async updateCoupon() {
      this.isLoading = true;
      const method = this.isNew ? 'post' : 'put';
      const apiUrl = this.isNew ? `${VITE_URL}/v2/api/${VITE_PATH}/admin/coupon` : `${VITE_URL}/v2/api/${VITE_PATH}/admin/coupon/${this.modalCoupon.id}`;
      try {
        const res = await this.axios[method](apiUrl, {
          data: this.modalCoupon,
        });
        if (res.data.success) {
          Swal.fire({
            title: `${res.data.message}`,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            didClose: () => {
              this.$emit('getCoupons');
              this.modal.hide();
            }
          })
        } else {
          Swal.fire({
            title: '錯誤發生',
            icon: 'error',
            text: `${res.data.message}`,
          });
        }
      } catch (err) {
        Swal.fire({
          title: '錯誤發生',
          icon: 'error',
          text: `${err.response.data.message}`,
        });
      } finally {
        this.isLoading = false;
      };
    },
    changeDate(e) {
      this.modalCoupon.due_date = e.target.valueAsNumber / 1000;
      console.log(123)
    }
  },
  watch: {
    tempCoupon() {
      this.modalCoupon = { ...this.tempCoupon };
      if (!this.modalCoupon.due_date) {
        this.modalCoupon.due_date = new Date().getTime();
      }
    }
  },
  mounted() {
    this.modal = new bootstrap.Modal('#couponModal');
  }
}
</script>

<template>
  <div class="modal fade" id="couponModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"  aria-labelledby="couponModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-light">
          <h2 class="modal-title" id="couponModalLabel">
            <span v-if="isNew">新增優惠券</span>
            <span v-else>編輯優惠券</span>
          </h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <VForm @submit="updateCoupon" id="couponForm" v-slot="{errors}">
            <div class="row gy-4">
              <div class="col-md-6 col-lg-4">
                <label for="title" class="form-label">優惠券名稱：</label>
                <VField id="title" name="優惠券名稱" type="text" class="form-control" :class="{ 'is-invalid': errors['優惠券名稱'] }" placeholder="請輸入 優惠券名稱" rules="required" v-model.trim="modalCoupon.title"/>
                <ErrorMessage name="優惠券名稱" class="invalid-feedback" />
              </div>
              <div class="col-md-6 col-lg-4">
                <label for="percent" class="form-label">折扣比例：</label>
                <VField id="percent" name="折扣比例" type="number" class="form-control" :class="{ 'is-invalid': errors['折扣比例'] }" placeholder="請輸入 折扣比例" :rules="{ min_value: 0, max_value: 99, required: true }" v-model.trim.number="modalCoupon.percent"/>
              </div>
              <div class="col-md-6 col-lg-4">
                <label for="is_enabled" class="form-label">狀態:</label>
                <VField id="is_enabled" name="狀態" class="form-control"
                  :class="{
                    'is-invalid': errors['狀態'],
                    'text-success': modalCoupon.is_enabled,
                    'text-danger': modalCoupon.is_enabled === 0,
                  }"
                  placeholder="請輸入 狀態" rules="required" v-model="modalCoupon.is_enabled" as="select">
                  <option :value="0" selected class="text-danger">未啟用</option>
                  <option :value="1" class="text-success">啟用</option>
                </VField>
                <ErrorMessage name="狀態" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="col-md-6 col-lg-4">
                <label for="code" class="form-label">折扣碼:</label>
                <VField id="code" name="折扣碼" type="text"
                  class="form-control" :class="{ 'is-invalid': errors['折扣碼'] }"
                  placeholder="請輸入折扣碼，如:Test123" rules="required" v-model="modalCoupon.code"></VField>
                <ErrorMessage name="折扣碼" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="col-md-6 col-lg-4">
                <label for="due_date" class="form-label">到期日:</label>
                <input type="date" id="due_date" name="到期日" class="date-input" pattern="yyyy-MM-dd" :min="$timeTransform(new Date().getTime())" 
                :value="$timeTransform(modalCoupon.due_date)" @input="changeDate">
              </div>
            </div>
          </VForm>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
          <button type="submit" class="btn btn-themeDark" :disabled="isLoading" form="couponForm">
            <span v-if="isNew">新增</span>
            <span v-else>修改</span>
          </button>
        </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-dialog{
  max-width: calc(100% - 16px);
  width: 100%;
  @media (width > 576px) {
    max-width: 80%;
  }
}

.date-input{
  display: block;
  width: 100%;
  padding: 6px 12px;
  appearance: none;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  &:focus-visible{
    outline: var(--bs-theme) auto 1px;
  }
}
</style>