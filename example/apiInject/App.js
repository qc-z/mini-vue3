import { h, provide, inject } from '../../lib/mini-vue.esm.js'

const Provide = {
  name: 'Provide',
  render() {
    return h('div', {}, [h('p', {}, "Provide"), h(ProvideTwo)])
  },
  setup() {
    provide('foo', "fooVal")
    provide('bar', "barVal")
  }
}
const ProvideTwo = {
  name: 'ProvideTwo',
  render() {
    return h('div', {}, [h('p', {}, `ProvideTwo foo - ${this.foo}`), h(Consumer)])
  },
  setup() {
    provide('foo', "fooTwo")
    const foo = inject('foo')
    return {
      foo
    }
  }
}

const Consumer = {
  name: 'Consumer',
  render() {
    return h('div', {}, `Consumer: ${this.foo} - ${this.bar} - ${this.baz}`)
  },
  setup() {
    const foo = inject('foo')
    const bar = inject('bar')
    const baz = inject('baz', () => 'bazDefault')
    return {
      foo,
      bar,
      baz
    }
  }
}

export const App = {
  name: 'provide',
  render() {
    return h('div', {}, [h('div', {}, [h("p", {}, "apiInject"), h(Provide)])])
  },
  setup() {

  }
}
