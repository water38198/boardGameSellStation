import{_ as h,m as p,r as n,o as l,c as _,f as a,a as t,w as m,t as s,g,F as b,b as d}from"./index-bf03b7d5.js";import{u as f}from"./utilities-99040fad.js";import{S as v}from"./sweetalert2.all-950390c3.js";const{VITE_URL:L,VITE_PATH:V}={VITE_URL:"https://vue3-course-api.hexschool.io",VITE_PATH:"payroom",BASE_URL:"/boardGameSellStation/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},x={data(){return{article:{},isLoading:!1}},methods:{getArticle(){this.isLoading=!0,this.$http.get(`${L}/v2/api/${V}/article/${this.$route.params.id}`).then(o=>{this.article=o.data.article}).catch(()=>{v.fire({icon:"error",title:"發生錯誤",text:"即將回到首頁，如果錯誤持續發生，請通知我們，感謝!!",didClose:()=>{this.$router.push("/")}})}).finally(()=>{this.isLoading=!1})},...p(f,["timeTransform"])},mounted(){this.getArticle()}},y={key:0,class:"container bg-white pt-100 pb-4 px-sm-5"},T={"aria-label":"breadcrumb",class:"mb-4"},k={class:"breadcrumb"},A={class:"breadcrumb-item"},E={class:"breadcrumb-item"},S={class:"breadcrumb-item active","aria-current":"page"},w={class:"h2"},R={class:"text-b60"},C={class:"me-4"},I={class:"my-4 text-center"},B=["src"],D=["innerHTML"],H={class:"text-center"};function N(o,i,U,M,e,P){const u=n("VLoading"),r=n("RouterLink");return l(),_(b,null,[a(u,{active:e.isLoading,"onUpdate:active":i[0]||(i[0]=c=>e.isLoading=c),"can-cancel":!1,"is-full-page":!0},null,8,["active"]),e.article.title?(l(),_("div",y,[t("nav",T,[t("ol",k,[t("li",A,[a(r,{to:"/",class:"link-theme"},{default:m(()=>[d("首頁")]),_:1})]),t("li",E,[a(r,{to:`../articles?category=${e.article.category}`,class:"link-theme"},{default:m(()=>[d(s(e.article.category),1)]),_:1},8,["to"])]),t("li",S,s(e.article.title),1)])]),t("h2",w,s(e.article.title),1),t("div",R,[t("span",C,"日期: "+s(o.timeTransform(e.article.create_at)),1),t("span",null,"作者: "+s(e.article.author),1)]),t("div",I,[t("img",{src:e.article.image,alt:"article image"},null,8,B)]),t("div",{innerHTML:e.article.content,class:"mb-5"},null,8,D),t("div",H,[t("button",{type:"button",class:"btn btn-theme text-white",onClick:i[1]||(i[1]=c=>this.$router.go(-1))}," 返回上一頁 ")])])):g("",!0)],64)}const G=h(x,[["render",N],["__scopeId","data-v-4950e493"]]);export{G as default};
