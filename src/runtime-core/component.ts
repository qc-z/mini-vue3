export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type
  }
  return component
}
export function setupComponent(instance) {
  // initProps
  // initSlots
  // 初始化有状态的组件
  setupStatefulComponent(instance)
}
export function setupStatefulComponent(instance: any) {
  const Component = instance.type
  const { setup } = Component
  // 用户可能不会写setup
  if (setup) {
    const setupResult = setup()
    // setupResult可能是对象或者函数
    handlerSetupResult(instance, setupResult)
  }
}

function handlerSetupResult(instance, setupResult: any) {
  //TODO: 1 function

  //  2 object 挂载在实例上
  if (typeof setupResult === 'object') {
    instance.setupState = setupResult
  }
  finishComponentSetup(instance)
}

function finishComponentSetup(instance: any) {
  const Component = instance.type
  if (!Component.render) {
    instance.render = Component.render
  }
}
