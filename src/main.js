import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment'

import App from './App.vue'
import router from './router'
import store from './store'
import Service from './api/service'

import './common/stylus/reset.styl'
import './common/stylus/common.styl'
import './assets/css/common.css'

Vue.use(ElementUI, {size: 'small'});
Vue.use(moment);
Vue.prototype.$moment = moment;
Vue.prototype.$service = Service;
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');