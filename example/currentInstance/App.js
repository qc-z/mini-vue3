import { h, getCurrentInstance } from '../../lib/mini-vue.esm.js'
import { Foo } from './foo.js'

window.self = null
export const App = {
  name: 'App',
  render() {
    return h('div', {}, [h('p', {}, 'currentinstance demo'), h(Foo)])
  },
  setup() {
    const instance = getCurrentInstance()
    console.log('App instance', instance)
  }
}
