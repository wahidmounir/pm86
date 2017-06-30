import Vue from 'vue'
import App from './App.vue'
import store from './stores'
import router from './routers'
import * as filters from './filters'
import ElementUI from 'element-ui'

Vue.use(ElementUI)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
