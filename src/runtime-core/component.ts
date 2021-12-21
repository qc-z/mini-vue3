import { PublicInstanceProxyHandlers } from './componentInstancePubilc'

// 创建一个组件实例
export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
    proxy: {}
  }
  return component
}
export function setupComponent(instance) {
  //TODO: initProps
  //TODO:  initSlots
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
    const setupResult = setup()
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
