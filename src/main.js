// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import NCWeb3 from "@/utils/web3";
NCWeb3.init().then(async web3 => {
    Vue.prototype.$web3 = web3;

    /* eslint-disable no-new */
    new Vue({
        el: '#app',
        router,
        components: { App },
        template: '<App/>'
    })
});
