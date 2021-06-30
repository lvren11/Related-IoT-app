import Vue from 'vue'
import App from './App'
import globalVal from '@/myjs/global_val.js'
Vue.config.productionTip = false
Vue.prototype.globalVal = globalVal


import zhouWeiNavBar from "@/components/common/zhouWei-navBar";
Vue.component("nav-bar", zhouWeiNavBar);
import Vailcode from '@/components/Vailcode.vue';
Vue.component('Vailcode',Vailcode);

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
