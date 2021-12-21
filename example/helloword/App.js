import { h } from '../../lib/mini-vue.esm.js'

window.self = null
export const App = {
  // 先实现render函数，因为template有点复杂
  render() {
    window.self = this
    return h(
      'div',
      {
        class: ['red', 'green'],
        id: 'root'
      },
      this.msg)
  },
  setup() {
    // componsition api
    return {
      msg: 'mini-vue111'
    }
  }
}
