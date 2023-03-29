import{_ as y,f as b,m as C,r as g,o as l,c,a as e,u as i,g as p,t as r,F as h,h as k,b as u,w}from"./index-cc83d5b9.js";import{c as m}from"./cartStore-ef6a7a48.js";import{P as L}from"./PaginationComponent-8b3b0284.js";import"./sweetalert2.all-716dd39f.js";const{VITE_URL:P,VITE_PATH:V}={VITE_URL:"https://vue3-course-api.hexschool.io",VITE_PATH:"payroom",BASE_URL:"/boardGameSellStation/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},T={data(){return{products:[],page:{},productIsLoading:!1,category:"all",listTitle:"全部"}},computed:{...b(m,["loadingItem"])},components:{PaginationComponent:L},methods:{changeCategory(a,s){this.listTitle=s.target.textContent,this.category=a,this.getProducts(1,this.category)},getProducts(a=1,s=""){this.productIsLoading=!0,s==="all"&&(s=""),this.$http.get(`${P}/v2/api/${V}/products?page=${a}&category=${s}`).then(d=>{this.products=d.data.products,this.page=d.data.pagination,this.productIsLoading=!1})},...C(m,["addToCart"])},mounted(){this.getProducts()}},I={class:"container bg-white py-5"},E={class:"row g-3"},S={class:"col-lg-3"},M={class:"sticky-top",style:{top:"90px"}},R=e("h3",{class:"text-theme text-center h3"},"商品類別",-1),B={class:"list-group text-center fs-5 flex-row flex-lg-column list-group-flush"},D={class:"col-lg-9 vl-parent"},j={class:"row g-3 align-items-stretch"},A={class:"h3 text-theme text-center"},H=["data-aos-duration"],U={class:"card h-100"},G=["src","alt"],N={class:"card-body d-flex flex-column"},F={class:"card-title"},O={class:"card-text text-truncate my-3"},q={key:0,class:"h4 mt-auto text-end"},W={key:1,class:"mt-auto d-flex justify-content-between"},Y={class:"h6"},z={class:"h4"},J={class:"text-danger"},K={class:"text-center mt-2 d-flex flex-column flex-sm-row justify-content-between"},Q=["disabled","onClick"],X=e("div",{class:"text-center"},[e("img",{src:"https://images.unsplash.com/photo-1660922771242-c598e0808188?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",alt:"",class:"w-50"})],-1),Z=e("div",{class:"text-center fs-4"}," 很抱歉，目前沒有此類商品，近期將會新增! ",-1);function $(a,s,d,tt,n,o){const _=g("VLoading"),f=g("RouterLink"),v=g("PaginationComponent");return l(),c("div",I,[e("div",E,[e("div",S,[e("div",M,[R,e("div",B,[e("a",{class:"list-group-item list-group-item-action active list-group-item","aria-current":"true","data-bs-toggle":"list",href:"#",onClick:s[0]||(s[0]=i(t=>o.changeCategory("all",t),["prevent"]))}," 全部 "),e("a",{class:"list-group-item list-group-item-action","data-bs-toggle":"list",href:"#",onClick:s[1]||(s[1]=i(t=>o.changeCategory("策略",t),["prevent"]))},"策略"),e("a",{class:"list-group-item list-group-item-action","data-bs-toggle":"list",href:"#",onClick:s[2]||(s[2]=i(t=>o.changeCategory("家庭",t),["prevent"]))},"家庭"),e("a",{class:"list-group-item list-group-item-action","data-bs-toggle":"list",href:"#",onClick:s[3]||(s[3]=i(t=>o.changeCategory("派對",t),["prevent"]))},"派對"),e("a",{class:"list-group-item list-group-item-action","data-bs-toggle":"list",href:"#",onClick:s[4]||(s[4]=i(t=>o.changeCategory("雙人",t),["prevent"]))},"雙人"),e("a",{class:"list-group-item list-group-item-action","data-bs-toggle":"list",href:"#",onClick:s[5]||(s[5]=i(t=>o.changeCategory("合作",t),["prevent"]))},"合作"),e("a",{class:"list-group-item list-group-item-action","data-bs-toggle":"list",href:"#",onClick:s[6]||(s[6]=i(t=>o.changeCategory("劇情",t),["prevent"]))},"劇情")])])]),e("div",D,[p(_,{active:n.productIsLoading,"onUpdate:active":s[7]||(s[7]=t=>n.productIsLoading=t),"can-cancel":!1,"is-full-page":!1},null,8,["active"]),e("div",j,[e("h3",A,r(n.listTitle),1),n.products.length?(l(!0),c(h,{key:0},k(n.products,(t,x)=>(l(),c("div",{class:"col-6 col-xl-4",key:t.id,"data-aos":"fade-up","data-aos-duration":`${1e3+x*200}`},[e("div",U,[e("img",{src:t.imageUrl,class:"card-img-top",alt:`${t.title}圖片`,style:{height:"250px","object-fit":"cover","object-position":"top"}},null,8,G),e("div",N,[e("h4",F,r(t.title),1),e("p",O,r(t.description),1),t.origin_price===t.price?(l(),c("div",q,r(t.price)+"元 ",1)):(l(),c("div",W,[e("div",null,[e("del",Y,"原價"+r(t.origin_price)+"元",1)]),e("div",z,[u(" 現在只要"),e("span",J,r(t.price),1),u("元 ")])])),e("div",K,[p(f,{to:`/product/${t.id}`,class:"btn btn-outline-theme d-block"},{default:w(()=>[u("查看更多")]),_:2},1032,["to"]),e("button",{type:"button",class:"btn btn-outline-danger d-block",disabled:a.loadingItem===t.id,onClick:et=>a.addToCart(t)}," 加入購物車 ",8,Q)])])])],8,H))),128)):(l(),c(h,{key:1},[X,Z],64)),p(v,{pages:n.page,"get-Method":o.getProducts},null,8,["pages","get-Method"])])])])])}const nt=y(T,[["render",$]]);export{nt as default};