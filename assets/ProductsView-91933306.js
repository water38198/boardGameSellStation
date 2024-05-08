import{_ as b,e as k,S as w,m as I,r as u,o as a,c as r,a as t,x as c,f as P,t as d,F as p,j as S,s as V,g as _,b as m,p as T,d as L}from"./index-288619d3.js";import{c as f}from"./cartStore-9886b13e.js";import{P as E}from"./PaginationComponent-bb8ba716.js";import"./utilities-5a299121.js";const{VITE_URL:B,VITE_PATH:M}={VITE_URL:"https://vue3-course-api.hexschool.io",VITE_PATH:"payroom",BASE_URL:"/boardGameSellStation/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},D={data(){return{products:[],page:{},isLoading:!1,category:"all",listTitle:"全部"}},computed:{...k(f,["loadingItem","cart"])},components:{PaginationComponent:E},methods:{changeCategory(o,s){this.listTitle=s.target.textContent,this.category=o,this.getProducts(1,this.category),window.scrollTo(0,0)},getProducts(o=1,s=""){this.isLoading=!0;let n=s;s==="all"&&(n=""),this.$http.get(`${B}/v2/api/${M}/products?page=${o}&category=${n}`).then(g=>{this.products=g.data.products,this.page=g.data.pagination}).catch(()=>{w.fire({icon:"error",title:"發生錯誤",text:"即將回到首頁，如果錯誤持續發生，請通知我們，感謝!!",didClose:()=>{this.$router.push("/")}})}).finally(()=>{this.isLoading=!1})},goProduct(o){this.loadingItem||this.$router.push(`/product/${o}`)},isInStock(o){return this.cart.carts.find(n=>n.product.id===o.id)?this.cart.carts.find(n=>n.product.id===o.id).product.stock===this.cart.carts.find(n=>n.product.id===o.id).qty:!1},...I(f,["addToCart"])},mounted(){this.getProducts()}},h=o=>(T("data-v-d9c671c5"),o=o(),L(),o),A={class:"container bg-white pt-100 pb-5"},H={class:"row g-3"},R={class:"col-lg-3"},N={class:"product-category"},U=h(()=>t("h3",{class:"text-theme text-center h3"},"商品類別",-1)),j={class:"list-group text-center fs-6 fs-md-5 flex-row flex-lg-column list-group-flush mt-4"},G={class:"col-lg-9 position-relative"},q={class:"row g-3 align-items-stretch"},F={class:"h3 text-theme text-center"},O=["data-aos-duration"],W=["onClick"],Y={class:"card h-100"},z={class:"product-image"},J=["src","alt"],K={class:"card-body"},Q={class:"card-title"},X={class:"card-text text-truncate my-3"},Z={key:0,class:"h4 text-end"},$={key:1,class:"d-flex justify-content-between"},tt={class:"h6 text-secondary"},et={class:"h4"},st={class:"text-danger"},ot={class:"text-center mt-2 text-center"},it={key:0,type:"button",class:"btn btn-outline-danger",disabled:""},at=["disabled","onClick"],nt=h(()=>t("div",{class:"text-center"},[t("img",{src:"https://images.unsplash.com/photo-1660922771242-c598e0808188?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",alt:"sorry, there is no items in this category",class:"w-50"})],-1)),rt=h(()=>t("div",{class:"text-center fs-4"}," 很抱歉，目前沒有此類商品，近期將會新增! ",-1));function ct(o,s,n,g,l,i){const v=u("VLoading"),y=u("PaginationComponent");return a(),r("div",A,[t("div",H,[t("div",R,[t("div",N,[U,t("div",j,[t("a",{class:"list-group-item list-group-item-action active list-group-item","aria-current":"true","data-bs-toggle":"list",href:"#",onClick:s[0]||(s[0]=c(e=>i.changeCategory("all",e),["prevent"]))}," 全部 "),t("a",{class:"list-group-item list-group-item-action","data-bs-toggle":"list",href:"#",onClick:s[1]||(s[1]=c(e=>i.changeCategory("策略",e),["prevent"]))},"策略"),t("a",{class:"list-group-item list-group-item-action","data-bs-toggle":"list",href:"#",onClick:s[2]||(s[2]=c(e=>i.changeCategory("家庭",e),["prevent"]))},"家庭"),t("a",{class:"list-group-item list-group-item-action","data-bs-toggle":"list",href:"#",onClick:s[3]||(s[3]=c(e=>i.changeCategory("派對",e),["prevent"]))},"派對"),t("a",{class:"list-group-item list-group-item-action","data-bs-toggle":"list",href:"#",onClick:s[4]||(s[4]=c(e=>i.changeCategory("雙人",e),["prevent"]))},"雙人"),t("a",{class:"list-group-item list-group-item-action","data-bs-toggle":"list",href:"#",onClick:s[5]||(s[5]=c(e=>i.changeCategory("合作",e),["prevent"]))},"合作"),t("a",{class:"list-group-item list-group-item-action","data-bs-toggle":"list",href:"#",onClick:s[6]||(s[6]=c(e=>i.changeCategory("劇情",e),["prevent"]))},"劇情")])])]),t("div",G,[P(v,{active:l.isLoading,"is-full-page":!1},null,8,["active"]),t("div",q,[t("h3",F,d(l.listTitle),1),l.products.length?(a(!0),r(p,{key:0},S(l.products,(e,x)=>(a(),r("div",{class:"col-md-6 col-xl-4",key:e.id,"data-aos":"fade-up","data-aos-duration":`${1e3+x*200}`},[t("a",{onClick:c(C=>i.goProduct(e.id),["prevent"]),class:"text-reset text-decoration-none product-card",href:"#"},[t("div",Y,[t("div",z,[t("img",{src:e.imageUrl,class:"card-img-top",alt:`${e.title}圖片`},null,8,J)]),t("div",K,[t("h4",Q,d(e.title),1),t("p",X,d(e.description),1),e.origin_price===e.price?(a(),r("div",Z,d(e.price)+"元 ",1)):(a(),r("div",$,[t("div",null,[t("del",tt,"原價"+d(e.origin_price)+"元",1)]),t("div",et,[m(" 特價 "),t("span",st,d(e.price),1),m(" 元 ")])])),t("div",ot,[o.cart.carts?(a(),r(p,{key:0},[i.isInStock(e)?(a(),r("button",it," 目前無庫存 ")):(a(),r("button",{key:1,type:"button",class:"btn btn-outline-danger",disabled:o.loadingItem===e.id,onClick:c(C=>o.addToCart(e),["self"])}," 加入購物車 ",8,at))],64)):_("",!0)])])])],8,W)],8,O))),128)):(a(),r(p,{key:1},[nt,rt],64)),l.page.total_pages!==1?(a(),V(y,{key:2,pages:l.page,"get-Method":i.getProducts},null,8,["pages","get-Method"])):_("",!0)])])])])}const ht=b(D,[["render",ct],["__scopeId","data-v-d9c671c5"]]);export{ht as default};
