import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiUrl: 'https://127.0.0.1:3000',
    socketIoUrl: 'https://127.0.0.1:5000',
    socketID: '',
    clientIP: '',
    isLoggedOut: true,
    jwt: '',
    username: '',
    BsAlert :{
    dismissCountDown: 0,
    alertMessage: '',
    alertType: '',
    dismissSecs: 10}
  },
  mutations: {
    setIsLoggedOut (state, payload) {
    state.isLoggedOut = payload
    }
  },
  getters: {
    getIsLoggedOut: state => {
      return state.isLoggedOut
    }
  },
  actions: {

  }
})
