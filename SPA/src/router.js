
import Home from './views/Home.vue'
import OidcCallback from './views/OidcCallback.vue'
import OidcPopupCallback from './views/OidcPopupCallback.vue'
import OidcCallbackError from './views/OidcCallbackError'
import { vuexOidcCreateRouterMiddleware } from 'vuex-oidc'
import store from '@/store'
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
    path: '/protected',
    name: 'protected',
    component: () => import(/* webpackChunkName: "protected" */ './views/Protected.vue')
  },
  {
    path: '/signin-callback', // Needs to match redirectUri in you oidcSettings
    name: 'signin-callback',
    component: OidcCallback
  },
  {
    path: '/oidc-popup-callback', // Needs to match popupRedirectUri in you oidcSettings
    name: 'oidcPopupCallback',
    component: OidcPopupCallback
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

router.beforeEach(vuexOidcCreateRouterMiddleware(store, 'oidcStore'))

export default router