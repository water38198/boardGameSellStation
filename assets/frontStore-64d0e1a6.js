import{j as a,k as o}from"./index-d3f30c04.js";const{VITE_URL:r,VITE_PATH:i}={VITE_URL:"https://vue3-course-api.hexschool.io",VITE_PATH:"payroom",BASE_URL:"/boardGameSellStation/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},n=a("frontStore",{state:()=>({articles:[],products:[],isLoading:!1}),actions:{frontInit(){this.isLoading=!0,Promise.all([o.get(`${r}/v2/api/${i}/articles`),o.get(`${r}/v2/api/${i}/products`)]).then(t=>{this.articles=t[0].data.articles,this.products=t[1].data.products,this.isLoading=!1})}},getters:{newestProducts:({products:t})=>t.slice(0,3),changedProducts:({products:t})=>[...t].sort((s,e)=>Object.keys(e.history[e.history.length-1])-Object.keys(s.history[s.history.length-1])).slice(0,3)}});export{n as f};
