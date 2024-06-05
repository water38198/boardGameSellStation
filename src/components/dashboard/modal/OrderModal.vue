<script>
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  props: {
    tempOrder: {
      type: Object,
      required:true,
    }
  },
  data() {
    return {
      modalOrder: {
        user: {},
        products:{},
      },
      isLoading: false,
      modal: null,
    }
  },
  methods: {
    async updateOrder() {
      this.isLoading = true;
      try {
        const res = await this.axios.put(`${VITE_URL}/v2/api/${VITE_PATH}/admin/order/${this.modalOrder.id}`, {
          data: this.modalOrder,
        });
        Swal.fire({
          title: `${res.data.message}`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1000,
          didClose: () => {
            this.$emit('getOrders');
            this.modal.hide();
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
    },
    isPhone(value) {
      // 電話驗證
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '需要09開頭的手機號碼十碼';
    },
  },
  watch: {
    tempOrder() {
      this.modalOrder = JSON.parse(JSON.stringify(this.tempOrder));
    }
  },
  mounted() {
    this.modal = new bootstrap.Modal('#orderModal');
  }
}
</script>

<template>
  <div class="modal fade" id="orderModal" data-bs-keyboard="false" tabindex="-1" aria-labelledby="orderModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header bg-light">
          <h2 class="modal-title" id="productModalLabel">
            訂單資訊
          </h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-6">
            <h3 class="mb-4">基本資訊</h3>
            <div class="row gap-4">
              <div class="col-md-4">
                <div class="input-group">
                  <span class="input-group-text" id="create_at">建立時間</span>
                  <input type="text" class="form-control" aria-label="createdTime" aria-describedby="create_at" disabled :value="$timeTransform(modalOrder.create_at)">
                </div>
              </div>
              <div class="col-md-4">
                <div class="input-group">
                  <span class="input-group-text" id="id">ID</span>
                  <input type="text" class="form-control" aria-label="ID" aria-describedby="id"
                    disabled :value="modalOrder.id"/>
                </div>
              </div>
              <div class="col-md-4">
                <div class="d-flex align-items-center">
                  <span class="me-2">付款狀態: </span>
                  <input type="checkbox" class="btn-check" id="btn-check-outlined"
                    autocomplete="off" v-model="modalOrder.is_paid"/>
                  <label class="btn" for="btn-check-outlined" :class="modalOrder.is_paid ?'btn-outline-success' : 'btn-outline-danger'">
                    <span v-if="modalOrder.is_paid">已付款 </span>
                    <span v-else>尚未付款 </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-6">
            <h3 class="mb-4">商品資訊</h3>
            <table class="table table-striped align-middle">
              <thead>
                <tr>
                  <th>名稱</th>
                  <th>數量</th>
                  <th class="text-end">單價</th>
                  <th class="text-end pe-4">總價</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(product,key) in modalOrder.products" :key="key">
                  <td>{{ product.product.title }}</td>
                  <td>{{ product.qty}}</td>
                  <td class="text-end">${{ product.product.price }}</td>
                  <td class="text-end pe-4">${{ product.final_total }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4" class="text-end pe-4">總金額：${{ modalOrder.total }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div>
            <h3 class="mb-4">顧客資訊</h3>
            <VForm v-slot="{ errors }" id="orderForm" class="row g-3" @submit="updateOrder">
              <div class="col-md-4">
                <label for="username" class="form-label">姓名：</label>
                <VField id="username" name="姓名" type="email" class="form-control" :class="{ 'is-invalid': errors['姓名'] }" placeholder="請輸入 姓名" rules="required" v-model="modalOrder.user.name"/>
                <ErrorMessage name="姓名" class="invalid-feedback" />
              </div>
              <div class="col-md-4">
                <label for="email" class="form-label">信箱：</label>
                <VField id="email" name="信箱" type="email" class="form-control" :class="{ 'is-invalid': errors['信箱'] }" placeholder="請輸入 信箱" :rules="{required:true,email:true}" v-model="modalOrder.user.email" />
                <ErrorMessage name="信箱" class="invalid-feedback" />
              </div>
              <div class="col-md-4">
                <label for="tel" class="form-label">電話：</label>
                <VField id="tel" type="tel" name="電話" class="form-control" :class="{'is-invalid':errors['電話']}" placeholder="請輸入電話" :rules="isPhone" v-model="modalOrder.user.tel"/>
                <ErrorMessage name="電話" class="invalid-feedback" />
              </div>
              <div>
                <label for="address" class="form-label">地址：</label>
                <VField id="address" type="text" name="地址" class="form-control" :class="{'is-invalid':errors['地址']}" placeholder="請輸入地址" rules="required"  v-model="modalOrder.user.address"/>
                <ErrorMessage name="地址" class="invalid-feedback" />
              </div>
              <div>
                <label for="message" class="form-label">留言：</label>
                <textarea name="" id="message" rows="8" class="form-control" v-model="modalOrder.user.message"></textarea>
              </div>
            </VForm>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="submit" class="btn btn-themeDark" :disabled="isLoading" form="orderForm">修改</button>
        </div>
      </div>

    </div>
  </div>

</template>