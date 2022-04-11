import { ShapeFlags } from '../shared/ShapeFlags'
import { createComponentInstance, setupComponent } from './component'
import { Fragment, Text } from './vnode'
import { createAppAPI } from './createApp';
import { effect } from '../reactivity/effect';

export function createRenderer(options) {
  const {
    createElement: hostCreateElement,
    patchProp: hostPatchProp,
    insert: hostInsert
  } = options

  function render(vnode, container) {
    // 调用path，进行递归处理
    patch(null, vnode, container, null)
  }
  function patch(n1, n2, container, parentComponent) {
    const { shapeFlag, type } = n2
    switch (type) {
      case Fragment:
        processFragment(n1, n2, container, parentComponent)
        break
      case Text:
        processText(n1, n2, container)
        break
      default:
        // type 是Fragment只渲染children
        if (shapeFlag & ShapeFlags.ELEMENT) {
          // 1 处理element
          processElement(n1, n2, container, parentComponent)
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          // 2 处理组件
          processComponent(n1, n2, container, parentComponent)

        }
    }

  }

  function setupRenderEffect(instance: any, initialVNode, container: any) {
    effect(() => {
      if (!instance.isMounted) {
        const { proxy } = instance;
        const subTree = (instance.subTree = instance.render.call(proxy));

        patch(null, subTree, container, instance);

        initialVNode.el = subTree.el;

        instance.isMounted = true;
      } else {
        const { proxy } = instance;
        const subTree = instance.render.call(proxy);
        const prevSubTree = instance.subTree;
        instance.subTree = subTree;

        patch(prevSubTree, subTree, container, instance);
      }
    });
  }

  // MARK:处理element类型
  function processElement(n1, n2, container: any, parentComponent) {
    if (!n1) {
      mountElement(n2, container, parentComponent);
    } else {
      patchElement(n1, n2, container);

    }
  }
  function patchElement(n1, n2, container) {
    console.log("patchElement");
    console.log("n1", n1);
    console.log("n2", n2);

  }
  function mountElement(vnode, container: any, parentComponent) {
    // 创建元素
    const el = (vnode.el = hostCreateElement(vnode.type))
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
      hostPatchProp(el, key, val)
    }
    hostInsert(el, container)
  }

  // MARK:处理组件类型
  function processComponent(n1, n2, container: any, parentComponent) {
    mountComponent(n2, container, parentComponent)
  }
  function mountComponent(initialVnode: any, container: any, parentComponent) {
    // 创建一个组件实例
    const instance = createComponentInstance(initialVnode, parentComponent)
    setupComponent(instance)
    setupRenderEffect(instance, initialVnode, container)
  }

  // MARK:处理Fragment件类型
  function processFragment(n1, n2, container: any, parentComponent) {
    mountChildren(n2, container, parentComponent)
  }

  // MARK:处理Text件类型
  function processText(n1, n2, container: any) {
    const { children } = n2
    const textNode = (n2.el = document.createTextNode(children))
    container.append(textNode)
  }


  function mountChildren(vnode, container, parentComponent) {
    vnode.children.forEach((v: any) => {
      patch(null, v, container, parentComponent)
    })
  }
  return {
    createApp: createAppAPI(render)
  }
}

