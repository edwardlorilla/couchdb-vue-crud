import Vue from 'vue';
import App from './App';
window._ = require('lodash');
window.axios = require('axios');
window.swal = require('sweetalert');

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
