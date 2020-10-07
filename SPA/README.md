# vuex-oidc

## Install vue.js

```
npm install -g @vue/cli
```

## Create a Vue project using the CLI

```
vue create vuex-oidc
```

## Clone the mdb-ui-kit

[Bootstrap 5 & Material Design 2.0 UI KIT](https://github.com/mdbootstrap/mdb-ui-kit)

## Copy mdb-ui-kit JS and CSS folder to the vue assets folder

```
assets--
	--js
	--css
```

## Install oidc-client

```
npm install oidc-client --save
```

## Install Axios

```
npm install axios --save
```

## Install vue-fontawesome

```
npm install @fortawesome/vue-fontawesome@3.0.0-1 --save 
```

## Install vue-toastification

```
npm install vue-toastification@2.0.0-beta.5 --save 
```

## Modify the main.js file

```
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
```

## Install Packages

```
npm install
```

## Compiles and hot-reloads for development

```
npm run serve
```

## Compiles and minifies for production

```
npm run build
```
