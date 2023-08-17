//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import( /* webpackChunkName: "register" */ '../views/home/Home.vue')
    },
    {
        path: '/detail',
        name: 'detail',
        component: () => import( /* webpackChunkName: "login" */ '../views/detail/Detail.vue')
    }

  
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes // <-- routes,
})

export default router