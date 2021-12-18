import { h } from '../../lib/mini-vue.esm.js'

export const App = {
  // 先实现render函数，因为template有点复杂
  render() {
    return h(
      'div',
      {
        class: ['red', 'green'],
        id: 'root'
      },
      [
        h('h1', { class: "red" }, 'h1'),
        h('h2', { class: "green" }, 'h2')])
  },
  setup() {
    // componsition api
    return {
      msg: 'mini-vue'
    }
  }
}
