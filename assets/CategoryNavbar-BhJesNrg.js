import{_ as o,o as t,c as r,G as i,a as n,F as c,i as l,n as u,E as d,t as p}from"./index-C-WNfngo.js";const g={props:{currentCategory:{type:String,default:""},categoryList:{type:Array,required:!0}}},_={class:"product-category"},f={class:"list-group text-center fs-5 flex-row flex-lg-column list-group-flush"},m=["onClick"];function y(s,h,a,C,v,k){return t(),r("div",_,[i(s.$slots,"title",{},void 0,!0),n("div",f,[(t(!0),r(c,null,l(a.categoryList,e=>(t(),r("a",{key:e,class:u(["list-group-item list-group-item-action list-group-item",{active:a.currentCategory===e}]),"aria-current":"true","data-bs-toggle":"list",href:"#",onClick:d($=>s.$emit("changeCategory",e),["prevent"])},p(e),11,m))),128))])])}const B=o(g,[["render",y],["__scopeId","data-v-6fa8da84"]]);export{B as C};