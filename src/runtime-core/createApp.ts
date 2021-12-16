import { render } from './renderer'
import { createdVnode } from './vnode'

export function createApp(rootComponent) {
  return {
    // 这里先写一个容器，因为vue3传递的是选择器，现在先用容器
    // 为了把App即系rootComponent的渲染到这个根容器里面
    mount(rootContainer) {
      // 先把rootComponent变成一个虚拟节点 vnode (rootComponent->vnode)
      // 后续所有逻辑都会基于这个虚拟节点进行处理
      const vnode = createdVnode(rootComponent)
      //接受一个vnode和虚拟节点
      render(vnode, rootContainer)
    }
  }
}
