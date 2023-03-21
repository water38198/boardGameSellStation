import { createApp } from "vue";
import { createPinia } from "pinia";

// 匯入BS5、客製化
import "./assets/all.scss";
import "bootstrap";
// 匯入BS5、客製化
import axios from "axios";
import VueAxios from "vue-axios";

import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";
import AllRules from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";
// vee-validate

// vue-loading
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
// vue-loading
import App from "./App.vue";
import router from "./router";

//CKEditor
import CKEditor from "@ckeditor/ckeditor5-vue";

//AOS
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();
//AOS

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

// 將當前 VeeValidate 的語系設定為繁體中文
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale("zh_TW");

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
app.use(CKEditor);
app.component("VField", Field);
app.component("VForm", Form);
app.component("ErrorMessage", ErrorMessage);
app.component("VLoading", Loading);
app.mount("#app");
