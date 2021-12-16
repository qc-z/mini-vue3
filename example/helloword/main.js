import { createApp } from '../../lib/mini-vue.esm.js'
import { App } from './App.js'
// 先用container 后面在写兼容字符串
const rootContainer = document.querySelector('#app')
// vue3语法
createApp(App).mount(rootContainer)
