import '@/assets/scss/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
// axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// BootStrap JS
import 'bootstrap';
// vee-validate
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';
import * as AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
// 將規則一一加入VeeValidate
Object.keys(AllRules).forEach(rule => {
  defineRule(rule, AllRules[rule]);
});
// 將當前 VeeValidate 的語系設定為繁體中文
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale('zh_TW');

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

// 組合函數全域使用
import useTimeTransform from '@/composables/timeTransform';

// AOS
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios);

app.component('VField', Field);
app.component('VForm', Form);
app.component('ErrorMessage', ErrorMessage);
app.component('VLoading', Loading);

app.config.globalProperties.$timeTransform = useTimeTransform().timeTransform;

app.mount('#app');
