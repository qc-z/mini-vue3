import { ShapeFlags } from '../shared/ShapeFlags'

import { createComponentInstance, setupComponent } from './component'
import { Fragment, Text } from './vnode'

export function render(vnode, container) {
  // 调用path，进行递归处理
  patch(vnode, container, null)
}
function patch(vnode, container, parentComponent) {
  const { shapeFlag, type } = vnode
  switch (type) {
    case Fragment:
      processFragment(vnode, container, parentComponent)
      break
    case Text:
      processText(vnode, container)
      break
    default:
      // type 是Fragment只渲染children
      if (shapeFlag & ShapeFlags.ELEMENT) {
        // 1 处理element
        processElement(vnode, container, parentComponent)
      } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        // 2 处理组件
        processComponent(vnode, container, parentComponent)

      }
  }

}

function setupRenderEffect(instance: any, initialVnode, container: any) {
  const { proxy } = instance
  // 就是return 出来的h函数
  const subTree = instance.render.call(proxy)
  patch(subTree, container, instance)
  // 要等到组件初始化完成之后才能获取到组件的el
  initialVnode.$el = subTree.el
}

// MARK:处理element类型
function processElement(vnode: any, container: any, parentComponent) {
  mountElement(vnode, container, parentComponent)
}
function mountElement(vnode: any, container: any, parentComponent) {
  // 创建元素
  const el = (vnode.el = document.createElement(vnode.type))
  // 判断children
  const { children, shapeFlag } = vnode
  // children是string
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children
    // children是array
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(vnode, el, parentComponent)
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

// MARK:处理组件类型
function processComponent(vnode: any, container: any, parentComponent) {
  mountComponent(vnode, container, parentComponent)
}
function mountComponent(initialVnode: any, container: any, parentComponent) {
  // 创建一个组件实例
  const instance = createComponentInstance(initialVnode, parentComponent)
  setupComponent(instance)
  setupRenderEffect(instance, initialVnode, container)
}

// MARK:处理Fragment件类型
function processFragment(vnode: any, container: any, parentComponent) {
  mountChildren(vnode, container, parentComponent)
}

// MARK:处理Text件类型
function processText(vnode: any, container: any) {
  const { children } = vnode
  const textNode = (vnode.el = document.createTextNode(children))
  container.append(textNode)
}


function mountChildren(vnode, container, parentComponent) {
  vnode.children.forEach((v: any) => {
    patch(v, container, parentComponent)
  })
}

