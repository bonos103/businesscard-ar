import {
  Layout,
  Input,
} from 'ant-design-vue'
import Vue from 'vue'
import VueMeta from 'vue-meta'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import '@/assets/stylesheets/ress.css'

Vue.config.productionTip = false

Vue.use(Layout)
Vue.use(Input)
Vue.use(VueMeta)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
