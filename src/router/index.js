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
    meta: {
      requiresAuth: true,
      title: 'Home'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {
      requiresAuth: true,
      title: 'About'
    }
  },
  {
    path: '/url-list',
    name: 'url-list',
    component: UrlListView,
    meta: {
      requiresAuth: true,
      title: 'My URLs'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      title: 'Register'
    }
  }
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
    return next('/')
  }

  if (to.meta.requiresAuth && !isLoggedIn) {
    return next('/login')
  }

  document.title = `Mystify v1 | ${to.meta.title}`|| 'Mystify v1'

  next()
})

export default router
