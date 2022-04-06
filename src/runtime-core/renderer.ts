import { ShapeFlags } from '../shared/ShapeFlags'

import { createComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
  // 调用path，进行递归处理
  patch(vnode, container)
}
function patch(vnode, container) {
  const { shapeFlag } = vnode
  if (shapeFlag & ShapeFlags.ELEMENT) {
    // 1 处理element
    processElement(vnode, container)
  } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    // 2 处理组件
    processComponent(vnode, container)

  }
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container)

}
// 处理组件
function mountComponent(initialVnode: any, container: any) {
  // 创建一个组件实例
  const instance = createComponentInstance(initialVnode)
  setupComponent(instance)
  setupRenderEffect(instance, initialVnode, container)
}

function setupRenderEffect(instance: any, initialVnode, container: any) {
  const { proxy } = instance

  // 就是return 出来的h函数
  const subTree = instance.render.call(proxy)
  patch(subTree, container)
  // 要等到组件初始化完成之后才能获取到组件的el
  initialVnode.$el = subTree.el
}

function processElement(vnode: any, container: any) {
  mountElement(vnode, container)
}

// 处理element
function mountElement(vnode: any, container: any) {
  // 创建元素
  const el = (vnode.el = document.createElement(vnode.type))
  // 判断children
  const { children, shapeFlag } = vnode
  // children是string
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children
    // children是array
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(vnode, el)
  }

  // 生成props
  const { props } = vnode
  for (const key in props) {
    const val = props[key]
    const isOn = (key: string) => /^on[A-Z]/.test(key)
    if (isOn(key)) {
      const event = key.slice(2).toLowerCase()
      el.addEventListener(event, val)
    } else {
      el.setAttribute(key, val)
    }
  }
  container.appendChild(el)
}

function mountChildren(vnode, container) {
  vnode.children.forEach((v: any) => {
    patch(v, container)
  })
}
