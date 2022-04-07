import { h, getCurrentInstance } from '../../lib/mini-vue.esm.js'

export const Foo = {
  name: 'foo',
  setup(props) {
    const instance = getCurrentInstance()
    console.log('Foo instance', instance)
    return {}
  },
  render() {
    return h('div', {}, 'foo')
  }
}
