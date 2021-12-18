import { isObject } from '../shared'
import { createComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
  // 调用path，进行递归处理
  patch(vnode, container)
}
function patch(vnode, container) {
  if (typeof vnode.type === 'string') {
    // 1 处理element
    processElement(vnode, container)
  } else if (isObject(vnode.type)) {
    // 2 处理组件
    processComponent(vnode, container)
  }
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
  patch(subTree, container)
}

// 处理组件
function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container)
}
// 处理element
function processElement(vnode: any, container: any) {
  // 创建元素
  const el = document.createElement(vnode.type)

  // 判断children
  const { children } = vnode
  // children是string
  if (typeof children === 'string') {
    el.textContent = children
    // children是array
  } else if (Array.isArray(children)) {
    mountChildren(vnode, el)
  }

  // 生成props
  const { props } = vnode
  for (const key in props) {
    const val = props[key]
    el.setAttribute(key, val)
  }
  container.appendChild(el)
}

function mountChildren(vnode, container) {
  vnode.children.forEach((v: any) => {
    patch(v, container)
  })
}
