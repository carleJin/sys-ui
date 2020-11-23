import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//theme
import '@/assets/styles/element-variables.scss';
//markdown-css
import 'github-markdown-css';
//iconfont
import '@/assets/icons/font_index.js';
//svg
import '@/assets/icons/svg_index.js';
//自定义指令
import '@/utils/directive.js';
//合并 element-ui 和 本地 语言包
import i18nMessages from './lang';
//全局组件
import '@/packages';

//css
import '@/assets/styles/index.less';

//顶部加载插件NProgress
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
Vue.use(NProgress);
//国际化插件VueI18n
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

//国际化实例
const i18n = new VueI18n({
    locale: localStorage.getItem('lang') || 'zhCN', //语言标识
    messages: i18nMessages,
    fallbackLocale: 'zhCN', //如果在message中找不到相应的键值将回退到原本的语言
    formatFallbackMessages: true //如果在message中找不到相应的键值将回退到原本的语言
})

//组件库element-ui
import ElementUi from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUi, {
    i18n: (key, value) => i18n.t(key, value)
})

//主题修改
import elementTheme from '@/components/themePicker/theme.js';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    i18n,
    data() {
        return {
            themeInstance: new elementTheme()
        }
    },
    render: h => h(App)
}).$mount("#app");
