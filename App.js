import { reactive, effectWatch } from './core/reactivity/index.js'
import { h } from './core/h.js'
export default {
  setup() {
    // 构建响应式数据
    const state = reactive({
      count: 0
    })
    window.state = state
    return {
      state
    }
  },
  render(context) {
    // tags
    // props
    // children
    // const div = document.createElement('div')
    // div.innerText = context.state.count
    return h(
      'div',
      {
        id: 'test-id',
        class: 'test-class'
      },
      [h('h3', null, '我是h3'), h('h4', null, '我是h4')]
    )
  }
}
