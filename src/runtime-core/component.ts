import { shallowReadonly } from '../reactivity/reactive'
import { emit } from './componentEmit'
import { PublicInstanceProxyHandlers } from './componentPubilcInstance'
import { initProps } from './componentProps'
import { initSlots } from './componentsSlots'

// 创建一个组件实例
export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    props: {},
    slots: {},
    emit: () => { }
  }
  component.emit = emit.bind(null, component) as any
  return component
}
export function setupComponent(instance) {
  // initProps初始化props
  initProps(instance, instance.vnode.props)
  // TODO:  initSlots初始化slots
  initSlots(instance, instance.vnode.children)
  // 初始化有状态的组件
  setupStatefulComponent(instance)
}
// 解构setup,并执行
export function setupStatefulComponent(instance: any) {
  const Component = instance.type

  // ctx
  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers)
  const { setup } = Component
  // 用户可能不会写setup
  if (setup) {
    setCurrentInstance(instance)
    const setupResult = setup(shallowReadonly(instance.props), {
      emit: instance.emit
    })
    setCurrentInstance(null)
    // setupResult可能是对象或者函数
    handlerSetupResult(instance, setupResult)
  }
}

function handlerSetupResult(instance, setupResult: any) {
  //TODO: 1 setupResult是function

  //  2 setupResult是object
  if (typeof setupResult === 'object') {
    // 挂载在实例上
    instance.setupState = setupResult
  }
  finishComponentSetup(instance)
}

function finishComponentSetup(instance: any) {
  const Component = instance.type
  // TODO:假设用户一定要写render
  // if (Component.render) {
  instance.render = Component.render
  // }
}
let currentInstance = null
export function getCurrentInstance() {
  return currentInstance
}

export function setCurrentInstance(instance) {
  currentInstance = instance
}
