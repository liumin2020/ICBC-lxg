import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from './api/axios.js'

import { Col, Row,Dialog,Collapse, CollapseItem,Toast,Loading} from 'vant';
import 'vant/lib/index.css';

import {Switch} from 'element-ui';

Vue.prototype.$EventBus = new Vue() //公共Bus
Vue.use(Col)
   .use(Row)
   .use(Dialog)
   .use(Collapse)
   .use( CollapseItem )
   .use(Toast)
   .use(Switch)
   .use(Loading)

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

