import { h } from '../../lib/mini-vue.esm.js'

export const App = {
  name: 'customRander',
  render() {
    return h('rect', {
      x: this.x,
      y: this.y,
    })
  },
  setup() {
    return {
      x: 200,
      y: 100
    }
  }
}
