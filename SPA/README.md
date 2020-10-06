# vuex-oidc-example

An example of how to use vuex-oidc: https://github.com/perarnborg/vuex-oidc

# Install vue.js

```
npm i -g @vue/cli
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

Vue is a very impressive project, and in addition to the core of the framework, it maintains a lot of utilities that make a Vue programmer's life easier.

One of them is the Vue CLI.

CLI stands for Command Line Interface.

> Note: There is a huge rework of the CLI going on right now, going from version 2 to 3. While not yet stable, I will describe version 3 because it's a huge improvement over version 2, and quite different.

## Installation

The Vue CLI is a command line utility, and you install it globally using npm:

```bash
npm install -g @vue/cli
```

or using Yarn:

```bash
yarn global add @vue/cli
```

Once you do so, you can invoke the `vue` command.

​          ![vue-cli.png](https://github.com/flaviocopes/vuehandbook/blob/master/03-vue-cli/vue-cli.png?raw=true)      

## What does the Vue CLI provide?

The CLI is essential for rapid Vue.js development.

Its main goal is to make sure all the tools you need are working along, to perform what you need, and abstracts away all the nitty-gritty configuration details that using each tool in isolation would require.

It can perform an initial project setup and scaffolding.

It's a flexible tool: once you create a project with the CLI, you can go and tweak the configuration, without having to *eject* your application (like you'd do with `create-react-app`).

> When you eject from create-react-app you can update and tweak what you want, but you can't rely on the cool features that create-react-app provides

You can configure anything and still be able to upgrade with ease.

After you create and configure the app, it acts as a runtime dependency tool, built on top of webpack.

The first encounter with the CLI is when creating a new Vue project.

## How to use the CLI to create a new Vue project

The first thing you're going to do with the CLI is to create a Vue app:

```bash
vue create example
```

The cool thing is that it's an interactive process. You need to pick a preset. By default, there is one preset that's providing Babel and ESLint integration:

​          ![vue-cli-presets.png](https://github.com/flaviocopes/vuehandbook/blob/master/03-vue-cli/vue-cli-presets.png?raw=true)      

I'm going to press the down arrow ⬇️  and manually choose the features I want:

​          ![vue-cli-choose-features.png](https://github.com/flaviocopes/vuehandbook/blob/master/03-vue-cli/vue-cli-choose-features.png?raw=true)      

Press `space` to enable one of the things you need, and then press `enter` to go on. Since I chose a linter/formatter, Vue CLI prompts me for the configuration. I chose ESLint + Prettier since that's my favorite setup:

​          ![vue-cli-choose-linter.png](https://github.com/flaviocopes/vuehandbook/blob/master/03-vue-cli/vue-cli-choose-linter.png?raw=true)      

Next thing is choosing how to apply linting. I choose **lint on save**.

​          ![vue-cli-choose-lint-features.png](https://github.com/flaviocopes/vuehandbook/blob/master/03-vue-cli/vue-cli-choose-lint-features.png?raw=true)      

and it's the last thing it asks me, and then it goes on to download the dependencies and create the Vue app:

​          ![vue-cli-create-app.png](https://github.com/flaviocopes/vuehandbook/blob/master/03-vue-cli/vue-cli-create-app.png?raw=true)      

## Add Bootstrap 5 & Material Design 2.0

### Copy MDB 5 Pro JS and CSS folder to vue assets folder

```
assets--
	--js
	--css
```
### Open the main.js file and import css annd js files from MDB 5
main.js
```
...

import './assets/css/mdb.min.css'
import './assets/js/mdb.min'

createApp(App).use(store).use(router).mount('#app')
```

