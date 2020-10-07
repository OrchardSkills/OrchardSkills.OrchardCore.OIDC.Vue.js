import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './assets/css/mdb.min.css'
import './assets/js/mdb.min'
import Oidc from './config/authService'
const app = createApp(App)
app.use(router)
app.mount('#app')

app.config.globalProperties.$oidc = new Oidc()
