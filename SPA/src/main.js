import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './assets/css/mdb.min.css'
import './assets/js/mdb.min'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import Oidc from './config/authService'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBars, faPlus)
const app = createApp(App)
app.use(Toast)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
app.config.globalProperties.$oidc = new Oidc()
