export const App = () => {
  // 先实现render函数，因为template有点复杂
  render(h) {
    return h('div', 'hi', this.msg)
  },
  setup()  {
    // componsition api
    return {
      msg: 'mini-vue'
    }
  }
}
