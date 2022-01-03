import { h } from '../../lib/mini-vue.esm.js'
import { Foo } from './foo.js'

window.self = null
export const App = {
  name: 'App',
  // 先实现render函数，因为template有点复杂
  render() {
    return h(
      'div',
      {
        class: ['red', 'green'],
        id: 'root',
        onClick: (val) => {
          console.log('click', val)
        },
        onMousedown: (val) => {
          console.log('onMousedown', val)
        },
        onMouseover: (val) => {
          console.log('onMouseover', val)
        }
      },
      [h('div', {}, 'hello-' + this.msg), h(Foo, { count: 1 })])
  },
  setup() {
    // componsition api
    return {
      msg: 'mini-vue'
    }
  }
}
