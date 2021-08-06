import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Home/Index'
import Cemetery from '@/pages/Cemetery/Index'
import CemeteryMobile from '@/pages/Cemetery/Mobile'
import Func from '@/utils/func'

const isMobile = Func.isMobile();

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: isMobile ? CemeteryMobile : Cemetery
        },
        {
            path: '/cemetery',
            name: 'Cemetery',
            component: Index
        }
    ]
})
