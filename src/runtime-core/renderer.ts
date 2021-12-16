import { createComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
  // 调用path，进行递归处理
  path(vnode, container)
}
function path(vnode, container) {
  //现阶段vnode的type只有component，只需要处理component即可
  // 1 处理组件
  processComponent(vnode, container)
  // 2 处理element
  processElement(vnode, container)
}

function mountComponent(vnode: any, container: any) {
  // 创建一个组件实例
  const instance = createComponentInstance(vnode)
  setupComponent(instance)
  setupRenderEffect(instance, container)
}

function setupRenderEffect(instance: any, container: any) {
  // 就是return 出来的h函数
  const subTree = instance.render()
  path(subTree, container)
}

// 处理组件
function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container)
}
// TODO: 处理element
function processElement(vnode: any, container: any) {
  throw new Error('Function not implemented.')
}
