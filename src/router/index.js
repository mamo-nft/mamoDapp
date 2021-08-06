import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Home/Index'
import Cemetery from '@/pages/Cemetery/Index'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Cemetery
        },
        {
            path: '/cemetery',
            name: 'Cemetery',
            component: Index
        }
    ]
})
