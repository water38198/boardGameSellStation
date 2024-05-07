import{I as d,m as l,j as o}from"./index-bf03b7d5.js";import{S as e}from"./sweetalert2.all-950390c3.js";import{u as h}from"./utilities-99040fad.js";const{VITE_URL:s,VITE_PATH:r}={VITE_URL:"https://vue3-course-api.hexschool.io",VITE_PATH:"payroom",BASE_URL:"/boardGameSellStation/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},u=d("cartStore",{state:()=>({cart:[],cartLoading:!1,loadingItem:"",coupon:""}),actions:{...l(h,["timeTransform"]),getCarts(){this.cartLoading=!0,o.get(`${s}/v2/api/${r}/cart`).then(t=>{this.cart=t.data.data,this.cartLoading=!1}).catch(t=>{e.fire({title:"錯誤發生",icon:"error",text:`${t.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`})}).finally(()=>{this.cartLoading=!1})},addToCart(t,a=1){this.loadingItem=t.id;const i={product_id:t.id,qty:a},c=this.cart.carts.find(n=>n.product_id===t.id);if(c&&c.product.stock<c.qty+a){e.fire({title:"出超庫存數量",icon:"error",confirmButtonColor:"#0FB99B"}),this.loadingItem="";return}this.loadingItem=t.id,o.post(`${s}/v2/api/${r}/cart`,{data:i}).then(()=>{this.getCarts(),this.loadingItem="",e.fire({position:"bottom-right",icon:"success",title:"成功加入購物車!",showConfirmButton:!1,toast:!0,timer:1500})}).catch(n=>{e.fire({title:"錯誤發生",icon:"error",text:`${n.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`})})},updateItemNum(t){this.cartLoading=!0;const a={product_id:t.product.id,qty:t.qty};o.put(`${s}/v2/api/${r}/cart/${t.id}`,{data:a}).then(()=>{e.fire({icon:"success",title:"更新成功",showConfirmButton:!1,timer:1500,didClose:()=>{this.getCarts()}})}).catch(i=>{e.fire({title:"錯誤發生",icon:"error",text:`${i.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`})}).finally(()=>{this.cartLoading=!1})},deleteCartItem(t){this.loadingItem=t,o.delete(`${s}/v2/api/${r}/cart/${t}`).then(()=>{e.fire({icon:"success",title:"刪除成功",showConfirmButton:!1,timer:1500,didClose:()=>{this.getCarts()}})}).catch(a=>{e.fire({title:"錯誤發生",icon:"error",text:`${a.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`})})},deleteCartAll(){this.loadingItem="all",e.fire({title:"確定嗎?",text:"你確定要清空購物車嗎?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#0FB99B",cancelButtonColor:"#d33",confirmButtonText:"確定",cancelButtonText:"取消",didClose:()=>{this.loadingItem=""}}).then(t=>{t.isConfirmed&&o.delete(`${s}/v2/api/${r}/carts`).then(()=>{e.fire("刪除成功!","購物車已清空","success"),this.getCarts()}).catch(a=>{e.fire({title:"錯誤發生",icon:"error",text:`${a.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`})})})},useCoupon(t){const a={data:{code:t}};o.post(`${s}/v2/api/${r}/coupon`,a).then(()=>{this.getCarts()}).catch(()=>e.fire({icon:"error",title:"哇...",text:"優惠券代碼錯誤!請確認"}))},sendOrder(t){const a={user:t};o.post(`${s}/v2/api/${r}/order`,{data:a}).then(i=>{e.fire({title:i.data.message,html:`<div class='container'><div class="row text-start">
      <div class="col-4">
        <p class="text-theme">訂單ID:</p>
        <p class="text-theme">建立時間:</p>
        <p class="text-theme">總金額:</p>
      </div>
      <div class="col-8">
        <p>${i.data.orderId}</p>
        <p>${this.timeTransform(i.data.create_at)}</p>
        <p>$${i.data.total}</p>
      </div>
    </div></div>  
              `,confirmButtonColor:"#0FB99B"}),this.getCarts()}).catch(i=>{e.fire({title:"錯誤發生",icon:"error",text:`${i.response.data.message}，請嘗試重新整理，如果此狀況持續發生，請聯絡我們`})})}}});export{u as c};
