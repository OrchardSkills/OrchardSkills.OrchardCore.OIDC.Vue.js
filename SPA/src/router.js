
import Home from './views/Home.vue'
import OidcSigInCallBack from './views/OidcSignInCallBack.vue'
import OidcSignOutCallBack from './views/OidcSignOutCallBack.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/signin-callback', // Needs to match redirectUri in you oidcSettings
    name: 'signin-callback',
    component: OidcSigInCallBack
  },
  {
    path: '/signout-callback', // Needs to match popupRedirectUri in you oidcSettings
    name: 'OidcSignOutCallback',
    component: OidcSignOutCallBack
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
