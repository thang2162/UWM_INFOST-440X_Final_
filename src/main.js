import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';


import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faExclamationTriangle, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

library.add(faCoffee, faExclamationTriangle, faPlusCircle, faTrashAlt);

Vue.component('font-awesome-icon', FontAwesomeIcon)

// Init plugin
Vue.use(Loading);

Vue.config.productionTip = false

Vue.use(BootstrapVue);

Vue.use(new VueSocketIO({
    debug: true,
    connection: store.state.socketIoUrl,
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    }
}))


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
