import{j as s,k as e}from"./index-d3f30c04.js";const{VITE_URL:i,VITE_PATH:l}={VITE_URL:"https://vue3-course-api.hexschool.io",VITE_PATH:"payroom",BASE_URL:"/boardGameSellStation/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},o=s("articleStore",{state:()=>({allArticles:[],articles:{articles:[],page:{}}}),actions:{getAllArticles(a=1){e.get(`${i}/v2/api/${l}/articles?page=${a}`).then(t=>{this.allArticles=this.allArticles.concat(t.data.articles),t.data.pagination.total_pages>1&&t.data.pagination.current_page<t.data.pagination.total_pages&&this.getAllArticles(a+1)})},getArticles(a=1){e.get(`${i}/v2/api/${l}/articles?page=${a}`).then(t=>{this.articles.articles=t.data.articles,this.articles.page=t.data.pagination})}},getters:{news:({allArticles:a})=>a.filter(t=>t.category==="新聞"),reviews:({allArticles:a})=>a.filter(t=>t.category==="心得"),unboxings:({allArticles:a})=>a.filter(t=>t.category==="開箱")}});export{o as a};
