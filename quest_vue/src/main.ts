import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as VueGoogleMaps from 'vue2-google-maps'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import vuetify from './plugins/vuetify';

Vue.use(Vuetify)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC9f2dMrxrtkho2J2UYnh0HvRjrjKg0Tbk',
    libraries: 'places', 
  },})

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
