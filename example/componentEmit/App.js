import { h } from '../../lib/mini-vue.esm.js'
import { Foo } from './foo.js'

export const App = {
  name: 'App',
  render() {
    return h(
      'div',
      {},
      [h('div', {}, 'App'), h(Foo, {
        onAdd(a, b) {
          console.log('onAdd', a)
          console.log('onAdd', b)
        },
        onAddFoo(a) {
          console.log('onAddFoo', a)
        }
      })])
  },
  setup() {
    return {
    }
  }
}
