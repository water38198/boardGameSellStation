import{c as r}from"./cartStore-BjVfQrfL.js";import{m as u,h as _,_ as m,o,k as p,w as h,a as e,t as d,c as a,b as n,E as b,F as f,f as k,r as y}from"./index-CLp7rXUj.js";const g={props:{product:{type:Object,required:!0}},computed:{...u(r,["loadingItem","cart"])},methods:{..._(r,["addToCart"]),isInStock(s){const c=this.cart.carts.find(t=>t.product.id===s.id);return c?c.product.stock===c.qty:!1}}},v={class:"card w-100"},x={class:"product-image"},C=["src","alt"],I={class:"card-body"},w={class:"card-title"},S={class:"card-text text-truncate my-3"},B={key:0,class:"h4 text-end"},N={key:1,class:"d-flex justify-content-between mb-4"},T={class:"text-secondary"},V={class:"text-danger h4"},j={class:"text-center mt-4"},q={key:0,type:"button",class:"btn btn-outline-danger",disabled:""},E=["disabled"];function F(s,c,t,L,P,i){const l=y("RouterLink");return o(),p(l,{to:`/product/${t.product.id}`,class:"text-reset text-decoration-none product-card"},{default:h(()=>[e("div",v,[e("div",x,[e("img",{src:t.product.imageUrl,class:"card-img-top",alt:`${t.product.title}圖片`},null,8,C)]),e("div",I,[e("h4",w,d(t.product.title),1),e("p",S,d(t.product.description),1),t.product.origin_price===t.product.price?(o(),a("div",B,d(t.product.price)+" 元 ",1)):(o(),a("div",N,[e("div",null,[e("del",T,"原價 "+d(t.product.origin_price)+" 元",1)]),e("div",null,[n(" 特價 "),e("span",V,d(t.product.price),1),n(" 元 ")])])),e("div",j,[s.cart.carts?(o(),a(f,{key:0},[i.isInStock(t.product)?(o(),a("button",q," 目前無庫存 ")):(o(),a("button",{key:1,type:"button",class:"btn btn-outline-danger",disabled:s.loadingItem===t.product.id,onClick:c[0]||(c[0]=b(R=>s.addToCart(t.product),["self","prevent"]))}," 加入購物車 ",8,E))],64)):k("",!0)])])])]),_:1},8,["to"])}const M=m(g,[["render",F],["__scopeId","data-v-9336ddfa"]]);export{M as P};