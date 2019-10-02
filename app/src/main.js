import {
  Button,
  Col,
  Layout,
  Dropdown,
  Icon,
  Input,
  Modal,
  Notification,
  Row,
} from 'ant-design-vue'
import Vue from 'vue'
import VueMeta from 'vue-meta'
import { extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import ja from 'vee-validate/dist/locale/ja.json'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import '@/assets/stylesheets/ress.css'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Col)
Vue.use(Dropdown)
Vue.use(Icon)
Vue.use(Input)
Vue.use(Layout)
Vue.use(Modal)
Vue.use(Notification)
Vue.use(Row)
Vue.use(VueMeta)

Object.entries(rules)
  .forEach(([name, rule]) => extend(name, { ...rule, message: ja.messages[name] }))
// for (const rule of rules) {
//   extend(rule, rules[rule])
// }

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
