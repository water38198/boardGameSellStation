import{P as I}from"./PaginationComponent-8b3b0284.js";import{m as M,_ as x,r as h,o as r,c as a,a as e,g as d,w as L,p as y,I as S,l as p,F as v,h as C,t as i,i as E,v as U,M as B}from"./index-cc83d5b9.js";import{u as T}from"./utilities-0554c086.js";import{S as b}from"./sweetalert2.all-716dd39f.js";const{VITE_URL:D,VITE_PATH:P}={VITE_URL:"https://vue3-course-api.hexschool.io",VITE_PATH:"payroom",BASE_URL:"/boardGameSellStation/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},R={props:["tempOrder","closeModal","getOrders"],data(){return{newOrder:{user:{},products:{}},loadingItem:""}},methods:{deleteOrderItem(n){if(Object.keys(this.newOrder.products).length===1){b.fire({icon:"error",title:"商品不得為空",showConfirmButton:!1,timer:1e3});return}this.newOrder.total-=this.newOrder.products[n].final_total,delete this.newOrder.products[n]},updateOrder(n,t){this.loadingItem=t;let f={data:{...{...n}}};this.$http.put(`${D}/v2/api/${P}/admin/order/${t}`,f).then(()=>{b.fire({icon:"success",title:"修改成功!",showConfirmButton:!1,timer:1e3,didClose:()=>{this.closeModal(),this.getOrders(),this.loadingItem=""}})}).catch(s=>{console.log(s)})},...M(T,["timeTransform"])},watch:{tempOrder(){this.newOrder=JSON.parse(JSON.stringify(this.tempOrder))}}},A={class:"modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable"},F={class:"modal-content"},q={class:"modal-header bg-light"},H=e("h3",{class:"modal-title",id:"orderModalLabel"},"訂單詳細內容",-1),N={class:"modal-body px-5"},$=e("h5",{class:"h5 fw-bold"},"基本資訊",-1),j={class:"col-4"},z={class:"input-group mb-3"},G=e("span",{class:"input-group-text",id:"create_at"},"建立時間",-1),J=["value"],W={class:"col-4"},X={class:"input-group mb-3"},K=e("span",{class:"input-group-text",id:"id"},"ID",-1),Q=["value"],Y={class:"col-4"},Z=e("span",{class:"me-2"},"付款狀態: ",-1),ee={key:0},te={key:1},se=e("h5",{class:"h5 fw-bold"},"訂購商品資訊",-1),oe={class:"col-12"},le={class:"table align-middle"},ne=e("thead",null,[e("tr",null,[e("th"),e("th",null,"商品名稱"),e("th",null,"數量"),e("th",{class:"text-end"},"單價"),e("th",{class:"text-end"},"總價")])],-1),de={key:0},re=["onClick"],ae={class:"text-end"},ie={class:"text-end"},ce={class:"text-end pe-2"},ue=e("h5",{class:"fw-bold"},"訂購人資訊",-1),me={class:"col-4"},_e=e("label",{for:"username",class:"form-label"},"訂購人姓名:",-1),he={class:"col-4"},pe=e("label",{for:"email",class:"form-label"},"訂購人Email:",-1),be={class:"col-4"},fe=e("label",{for:"tel",class:"form-label"},"訂購人電話:",-1),ge={class:"col-6"},Oe=e("label",{for:"address",class:"form-label"},"訂購人地址:",-1),ve={class:"col-12"},we=e("label",{for:"message",class:"form-label"},"留言備註",-1),ye={class:"modal-footer"},Ve=["disabled"];function ke(n,t,c,f,s,u){const m=h("VField"),_=h("ErrorMessage"),g=h("VForm");return r(),a("div",A,[e("div",F,[e("div",q,[H,e("button",{type:"button",class:"btn-close",onClick:t[0]||(t[0]=o=>c.closeModal()),"aria-label":"Close"})]),e("div",N,[d(g,{id:"OrderModal",class:"row g-3",onSubmit:t[7]||(t[7]=o=>u.updateOrder(s.newOrder,s.newOrder.id))},{default:L(({errors:o})=>[$,e("div",j,[e("div",z,[G,e("input",{type:"text",class:"form-control","aria-label":"createdTime","aria-describedby":"create_at",disabled:"",value:n.timeTransform(s.newOrder.create_at)},null,8,J)])]),e("div",W,[e("div",X,[K,e("input",{type:"text",class:"form-control","aria-label":"ID","aria-describedby":"id",disabled:"",value:s.newOrder.id},null,8,Q)])]),e("div",Y,[Z,y(e("input",{type:"checkbox",class:"btn-check",id:"btn-check-outlined",autocomplete:"off","onUpdate:modelValue":t[1]||(t[1]=l=>s.newOrder.is_paid=l)},null,512),[[S,s.newOrder.is_paid]]),e("label",{class:p(["btn",{"btn-outline-success":s.newOrder.is_paid,"btn-outline-danger":!s.newOrder.is_paid}]),for:"btn-check-outlined"},[s.newOrder.is_paid?(r(),a("span",ee,"已付款 ")):(r(),a("span",te,"尚未付款 "))],2)]),se,e("div",oe,[e("table",le,[ne,s.newOrder.products?(r(),a("tbody",de,[(r(!0),a(v,null,C(s.newOrder.products,(l,w)=>(r(),a("tr",{key:w},[e("td",null,[e("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:qe=>u.deleteOrderItem(w)}," X ",8,re)]),e("td",null,i(l.product.title),1),e("td",null,i(l.qty),1),e("td",ae,i(l.product.price),1),e("td",ie,i(l.final_total),1)]))),128))])):E("",!0)]),e("p",ce,"總金額:$ "+i(s.newOrder.total),1)]),ue,e("div",me,[_e,d(m,{id:"username",name:"訂購人姓名",type:"text",class:p(["form-control",{"is-invalid":o.訂購人姓名}]),placeholder:"請輸入 訂購人姓名",rules:"required",modelValue:s.newOrder.user.name,"onUpdate:modelValue":t[2]||(t[2]=l=>s.newOrder.user.name=l)},null,8,["class","modelValue"]),d(_,{name:"訂購人姓名",class:"invalid-feedback"})]),e("div",he,[pe,d(m,{id:"email",name:"訂購人Email",type:"email",class:p(["form-control",{"is-invalid":o.訂購人Email}]),placeholder:"請輸入 訂購人Email",rules:"required",modelValue:s.newOrder.user.email,"onUpdate:modelValue":t[3]||(t[3]=l=>s.newOrder.user.email=l)},null,8,["class","modelValue"]),d(_,{name:"訂購人Email",class:"invalid-feedback"})]),e("div",be,[fe,d(m,{id:"tel",name:"訂購人電話",type:"tel",class:p(["form-control",{"is-invalid":o.訂購人電話}]),placeholder:"請輸入 訂購人電話",rules:"required",modelValue:s.newOrder.user.tel,"onUpdate:modelValue":t[4]||(t[4]=l=>s.newOrder.user.tel=l)},null,8,["class","modelValue"]),d(_,{name:"訂購人電話",class:"invalid-feedback"})]),e("div",ge,[Oe,d(m,{id:"address",name:"訂購人地址",type:"address",class:p(["form-control",{"is-invalid":o.訂購人地址}]),placeholder:"請輸入 訂購人地址",rules:"required",modelValue:s.newOrder.user.address,"onUpdate:modelValue":t[5]||(t[5]=l=>s.newOrder.user.address=l)},null,8,["class","modelValue"]),d(_,{name:"訂購人Email",class:"invalid-feedback"})]),e("div",ve,[we,y(e("textarea",{name:"",id:"message",cols:"20",rows:"5","onUpdate:modelValue":t[6]||(t[6]=l=>s.newOrder.user.message=l),class:"form-control"},null,512),[[U,s.newOrder.user.message]])])]),_:1})]),e("div",ye,[e("button",{type:"button",class:"btn btn-secondary",onClick:t[8]||(t[8]=o=>c.closeModal())}," 取消 "),e("button",{type:"submit",class:"btn btn-primary",disabled:s.loadingItem===s.newOrder.id,form:"OrderModal"}," 確認 ",8,Ve)])])])}const Me=x(R,[["render",ke]]),{VITE_URL:V,VITE_PATH:k}={VITE_URL:"https://vue3-course-api.hexschool.io",VITE_PATH:"payroom",BASE_URL:"/boardGameSellStation/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};let O={};const xe={data(){return{orders:[],tempOrder:{},page:{},isLoading:!1}},components:{PaginationComponent:I,OrderModal:Me},methods:{getOrders(n=1){this.isLoading=!0,this.$http.get(`${V}/v2/api/${k}/admin/orders?page=${n}`).then(t=>{this.orders=t.data.orders,this.page=t.data.pagination}).catch(t=>{console.log(t)}).finally(()=>{this.isLoading=!1})},openModal(n){this.tempOrder={...n},O.show()},closeModal(){this.tempOrder={user:{},products:{}},O.hide()},deleteOrder(n){b.fire({title:"確定刪除嗎?",text:"刪除後不可復原，確定嗎",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",confirmButtonText:"確定",cancelButtonColor:"#d33",cancelButtonText:"取消"}).then(t=>{t.isConfirmed&&(this.isLoading=!0,this.$http.delete(`${V}/v2/api/${k}/admin/order/${n}`).then(()=>{this.isLoading=!1,b.fire({icon:"success",title:"訂單刪除成功",showConfirmButton:!1,timer:1e3,didClose:()=>{this.getOrders()}})}).catch(c=>{console.log(c)}))})},...M(T,["timeTransform"])},mounted(){var t;const n=(t=document.cookie.split("; ").find(c=>c.startsWith("myToken=")))==null?void 0:t.split("=")[1];this.$http.defaults.headers.common.Authorization=n,this.getOrders(),O=new B("#orderModal")}},Ce={class:"vl-parent"},Ee={class:"row justify-content-center"},Te={class:"col"},Ie=e("h2",{class:"h2 text-center"},"訂單",-1),Le={class:"table table-hover"},Se=e("thead",null,[e("tr",null,[e("th",{scope:"col"},"建立時間"),e("th",{scope:"col"},"ID"),e("th",{scope:"col"},"姓名"),e("th",{scope:"col"},"付款狀態"),e("th",{scope:"col"},"總金額"),e("th",{scope:"col"},"編輯")])],-1),Ue={key:0,class:"text-success"},Be={key:1,class:"text-danger"},De=["onClick"],Pe=["onClick"],Re={colspan:"6",class:"text-center"},Ae={class:"modal fade",id:"orderModal","data-bs-keyboard":"false",tabindex:"-1","aria-labelledby":"orderModalLabel","aria-hidden":"true"};function Fe(n,t,c,f,s,u){const m=h("VLoading"),_=h("PaginationComponent"),g=h("OrderModal");return r(),a(v,null,[e("div",Ce,[d(m,{active:s.isLoading,"onUpdate:active":t[0]||(t[0]=o=>s.isLoading=o),"can-cancel":!1,"is-full-page":!0},null,8,["active"])]),e("div",Ee,[e("div",Te,[Ie,e("table",Le,[Se,e("tbody",null,[s.orders?(r(!0),a(v,{key:0},C(s.orders,o=>(r(),a("tr",{key:o.id},[e("td",null,i(n.timeTransform(o.create_at*1e3)),1),e("td",null,i(o.id),1),e("td",null,i(o.user.name),1),e("td",null,[o.is_paid?(r(),a("span",Ue,"已付款")):(r(),a("span",Be,"未付款"))]),e("td",null,i(o.total),1),e("td",null,[e("button",{type:"button",class:"btn btn-outline-primary btn-sm me-2",onClick:l=>u.openModal(o)}," 編輯 ",8,De),e("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:l=>u.deleteOrder(o.id)}," 刪除 ",8,Pe)])]))),128)):E("",!0)]),e("tfoot",null,[e("tr",null,[e("td",Re," 本頁有"+i(s.orders.length)+"項訂單 ",1)])])]),d(_,{pages:s.page,"get-Method":u.getOrders},null,8,["pages","get-Method"])])]),e("div",Ae,[d(g,{"temp-Order":s.tempOrder,"close-Modal":u.closeModal,"get-Orders":u.getOrders},null,8,["temp-Order","close-Modal","get-Orders"])])],64)}const ze=x(xe,[["render",Fe]]);export{ze as default};