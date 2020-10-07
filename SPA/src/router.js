
import Home from './views/Home.vue'
import OidcCallback from './views/OidcCallback.vue'
import OidcSignOutCallback from './views/OidcSignOutCallBack.vue'
import OidcCallbackError from './views/OidcCallbackError'
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
    component: OidcCallback
  },
  {
    path: '/signout-callback', // Needs to match popupRedirectUri in you oidcSettings
    name: 'OidcSignOutCallback',
    component: OidcSignOutCallback
  },
  {
    path: '/oidc-callback-error', // Needs to match redirect_uri in you oidcSettings
    name: 'signin-callbackError',
    component: OidcCallbackError,
    meta: {
      isPublic: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
