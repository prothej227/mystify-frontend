import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import UrlListView from '@/views/UrlListView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { useUserStore } from '@/stores/user'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true } 
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: { requiresAuth: true } 
  },
  {
    path: '/url-list',
    name: 'url-list',
    component: UrlListView,
    meta: { requiresAuth: true } 
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const unprotectedPaths = ['/login', '/register']

  if (!userStore.user) {
    await userStore.fetchUser()
  }

  const isLoggedIn = !!userStore.user?.current_active_uuid

  if (unprotectedPaths.includes(to.path) && isLoggedIn) {
    // Prevent logged-in users from visiting /login
    return next('/')
  }

  if (to.meta.requiresAuth && !isLoggedIn) {
    // Redirect unauthenticated users from protected routes
    return next('/login')
  }

  next()

  
})
export default router
