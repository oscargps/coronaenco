import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.config.productionTip = false
Vue.use(BootstrapVue)
import JsonExcel from 'vue-json-excel'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFileExcel, faDownload } from '@fortawesome/free-solid-svg-icons'
library.add(faFileExcel)
library.add(faDownload)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('downloadExcel', JsonExcel)
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
 
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
