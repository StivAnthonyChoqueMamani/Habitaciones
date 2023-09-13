import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogbookView from '../views/logbook/IndexView.vue'
import UserView from '../views/user/IndexView.vue'
import BedroomView from '../views/bedroom/IndexView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/logbooks',
      name: 'logbooks',
      component: LogbookView
    },
    {
      path: '/users',
      name: 'users',
      component: UserView
    },
    {
      path: '/bedrooms',
      name: 'bedrooms',
      component: BedroomView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
