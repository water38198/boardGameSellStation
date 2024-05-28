import{_ as v,S as c,c as V,e as a,a as s,w,r as n,o as b,n as p}from"./index-C-WNfngo.js";var x={VITE_URL:"https://vue3-course-api.hexschool.io",VITE_PATH:"payroom",BASE_URL:"/boardGameSellStation/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:h}=x,y={data(){return{user:{},isLoading:!1}},methods:{async login(){var i,e;this.isLoading=!0;try{const o=await this.axios.post(`${h}/v2/admin/signin`,{username:this.user.account,password:this.user.password}),{expired:l,token:t}=o.data;document.cookie=`myToken=${t}; expires=${new Date(l)}`,c.fire({icon:"success",title:"登入成功",showConfirmButton:!1,timer:1e3,didClose:()=>{this.$router.push("/dashboard")}})}catch(o){c.fire({title:"錯誤發生",icon:"error",text:`${((e=(i=o.response)==null?void 0:i.data)==null?void 0:e.message)||"登入失敗"}`})}finally{this.isLoading=!1}},async loginCheck(){var e;this.isLoading=!0;const i=(e=document.cookie.split("; ").find(o=>o.startsWith("myToken=")))==null?void 0:e.split("=")[1];this.axios.defaults.headers.common.Authorization=i;try{(await this.axios.post(`${h}/v2/api/user/check`)).data.success&&c.fire({title:"錯誤發生",icon:"error",text:"請重新登入",didClose:()=>{this.$router.push("/login")}})}catch{document.cookie="myToken=; expires="}finally{this.isLoading=!1}}},mounted(){this.loginCheck()}},k={class:"container min-vh-100 pt-100"},L={class:"row justify-content-center pt-5"},E={class:"col-8 col-md-6 col-lg-4"},S=s("h2",{class:"text-center"},"登入",-1),C={class:"form-floating mb-3"},T=s("label",{for:"account",class:"h5 bg-transparent"},"帳號:",-1),B={class:"form-floating mb-4"},R=s("label",{for:"password",class:"h5"},"密碼:",-1),U={class:"text-center"},D=["disabled"];function F(i,e,o,l,t,_){const f=n("VLoading"),d=n("VField"),u=n("ErrorMessage"),g=n("VForm");return b(),V("div",k,[a(f,{active:t.isLoading},null,8,["active"]),s("div",L,[s("div",E,[S,a(g,{onSubmit:_.login,class:"my-5"},{default:w(({errors:m})=>[s("div",C,[a(d,{id:"account",name:"帳號",type:"text",class:p(["form-control",{"is-invalid":m.帳號}]),placeholder:"請輸入 帳號",rules:"required|email",modelValue:t.user.account,"onUpdate:modelValue":e[0]||(e[0]=r=>t.user.account=r),autocomplete:"off","aria-autocomplete":"none"},null,8,["class","modelValue"]),T,a(u,{name:"帳號",class:"invalid-feedback"})]),s("div",B,[a(d,{id:"password",name:"密碼",type:"password",class:p(["form-control",{"is-invalid":m.密碼}]),placeholder:"請輸入 密碼",rules:"required",modelValue:t.user.password,"onUpdate:modelValue":e[1]||(e[1]=r=>t.user.password=r)},null,8,["class","modelValue"]),R,a(u,{name:"密碼",class:"invalid-feedback"})]),s("div",U,[s("button",{type:"submit",class:"btn btn-theme text-white w-100 py-2",disabled:t.isLoading}," 登入 ",8,D)])]),_:1},8,["onSubmit"])])])])}const A=v(y,[["render",F]]);export{A as default};
