import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue'
import router from './router'
import store from './store'
import Service from './api/service'

import './common/stylus/reset.styl'
import './common/stylus/common.styl'
import './assets/css/common.css'

//kindeditor编辑器
import '../static/kindeditor/themes/default/default.css'
import '../static/kindeditor/themes/simple/simple.css'
import '../static/kindeditor/kindeditor-all.js'
// import '../static/kindeditor/kindeditor-all-min.js'
import '../static/kindeditor/lang/zh-CN.js'

// 是否可以通过点击 modal 关闭 Dialog
ElementUI.Dialog.props.closeOnClickModal.default = false;
// Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true
ElementUI.Dialog.props.modalAppendToBody.default = false;
// 是否在 Dialog 出现时将 body 滚动锁定
ElementUI.Dialog.props.lockScroll.default = false;
// 分页默认
ElementUI.Pagination.props.layout.default = "total, sizes, prev, pager, next";
ElementUI.Pagination.props.pageSizes.default = function () {
    return [5, 15, 20, 30, 50, 100];
};

ElementUI.Tooltip.props.enterable.default = false;
ElementUI.Tooltip.props.openDelay.default = 600;

Vue.use(ElementUI, {size: 'small'});
Vue.prototype.$service = Service;
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
