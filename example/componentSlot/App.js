import { h } from '../../lib/mini-vue.esm.js'
import { Foo } from './foo.js'

export const App = {
  name: 'App',
  render() {
    const app = h('div', {}, 'App')
    // 1 数组
    // const foo = h(Foo, {}, [h('p ', {}, '123'), h('p', {}, '1234')])
    // 2 单个值
    // const foo = h(Foo, {}, h('p', {}, '123'))
    // 3 指定位置
    const foo = h(Foo, {},
      {
        header: h('p', {}, 'header'),
        footer: h('p', {}, 'footer')
      }
    )
    return h('div', {}, [app, foo])
  },
  setup() {
    return {}
  }
}
