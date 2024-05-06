<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import Swal from 'sweetalert2';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  props: ['isNew', 'tempCoupon', 'closeModal', 'getCoupons'],
  data() {
    return {
      newCoupon: {},
      loadingItem: '',
    };
  },
  methods: {
    updateCoupon() {
      this.loadingItem = 'confirmButton';
      let method = 'post';
      let apiUrl = `${VITE_URL}/v2/api/${VITE_PATH}/admin/coupon`;
      if (!this.isNew) {
        apiUrl += `/${this.newCoupon.id}`;
        method = 'put';
      }
      this.newCoupon.is_enabled -= 0;
      this.newCoupon.percent -= 0;
      this.$http[method](apiUrl, { data: this.newCoupon })
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: `${method === 'put' ? '修改成功!!' : '新增成功!!'}`,
            showConfirmButton: false,
            timer: 1500,
            didClose: () => {
              this.closeModal();
              this.loadingItem = '';
              this.getCoupons();
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
  },
  components: { VueDatePicker },
  watch: {
    tempCoupon() {
      this.newCoupon = { ...this.tempCoupon };
    },
  },
};
</script>

<template>
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content">
      <div class="modal-header bg-light">
        <h5 class="modal-title" id="productModalLabel">
          <span v-if="isNew">新增優惠券</span>
          <span v-else>編輯優惠券</span>
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <VForm
          @submit="updateCoupon"
          class="row g-2"
          id="CouponModal"
          v-slot="{ errors }"
        >
          <div class="col-4">
            <label for="title" class="form-label">優惠券名稱:</label>
            <VField
              id="title"
              name="優惠券名稱"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['優惠券名稱'] }"
              placeholder="請輸入 優惠券名稱"
              rules="required"
              v-model="newCoupon.title"
            ></VField>
            <ErrorMessage
              name="優惠券名稱"
              class="invalid-feedback"
            ></ErrorMessage>
          </div>
          <div class="col-4">
            <label for="percent" class="form-label">折扣比例:</label>
            <VField
              id="percent"
              name="折扣比例"
              type="number"
              class="form-control"
              :class="{ 'is-invalid': errors['折扣比例'] }"
              placeholder="請輸入 折扣比例"
              :rules="{ min_value: 0, max_value: 99, required: true }"
              v-model="newCoupon.percent"
            ></VField>
            <ErrorMessage
              name="折扣比例"
              class="invalid-feedback"
            ></ErrorMessage>
          </div>
          <div class="col-4">
            <label for="is_enabled" class="form-label">狀態:</label>
            <VField
              id="is_enabled"
              name="狀態"
              class="form-control"
              :class="{
                'is-invalid': errors['狀態'],
                'text-success': newCoupon.is_enabled,
                'text-danger': newCoupon.is_enabled === '0',
              }"
              placeholder="請輸入 狀態"
              rules="required"
              v-model="newCoupon.is_enabled"
              as="select"
            >
              <option value="0" selected class="text-danger">未啟用</option>
              <option value="1" class="text-success">啟用</option>
            </VField>
            <ErrorMessage name="狀態" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="col-4">
            <label for="code" class="form-label">折扣碼:</label>
            <VField
              id="code"
              name="折扣碼"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['折扣碼'] }"
              placeholder="請輸入折扣碼，如:Test123"
              rules="required"
              v-model="newCoupon.code"
            ></VField>
            <ErrorMessage name="折扣碼" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="col-4">
            <label for="due_date" class="form-label">到期日:</label>
            <VueDatePicker
              v-model="newCoupon.due_date"
              model-type="timestamp"
              required
              :min-date="new Date()"
              :enable-time-picker="false"
              cancelText="取消"
              selectText="選擇"
              auto-apply
            ></VueDatePicker>
          </div>
        </VForm>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="closeModal">
          取消
        </button>
        <button
          type="submit"
          class="btn btn-primary"
          form="CouponModal"
          :disabled="loadingItem === 'confirmButton'"
        >
          確認
        </button>
      </div>
    </div>
  </div>
</template>
