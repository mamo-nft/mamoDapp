import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/About.vue'

import Index from '../views/Home/Index'
import Cemetery from '../views/Cemetery/Index'
import CemeteryMobile from '../views/Cemetery/Mobile'
import Func from '../utils/func'

const isMobile = Func.isMobile();

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Index',
		component: isMobile ? CemeteryMobile : Cemetery
	},
	{
		path: '/cemetery',
		name: 'Cemetery',
		component: Index
	},
	{
		path: '/about',
		name: 'About',
		component: About
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
