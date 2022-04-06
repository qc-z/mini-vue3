import { h, renderSlots } from '../../lib/mini-vue.esm.js'
export const Foo = {
  name: 'foo',
  setup() {

  },
  render() {
    const foo = h('h1', {}, 'foo')
    return h('div', {},
      [
        renderSlots(this.$slots, 'header'),
        foo,
        renderSlots(this.$slots, 'footer')
      ]
    )
  },
}
