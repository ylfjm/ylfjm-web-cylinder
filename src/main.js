import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue'
import router from './router'
import store from './store'
import Service from './api/service'

import './assets/css/common.css'
import './common/stylus/common.styl'
import './common/stylus/reset.styl'

Vue.use(ElementUI, {size: 'small'});
Vue.prototype.$service = Service;
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
