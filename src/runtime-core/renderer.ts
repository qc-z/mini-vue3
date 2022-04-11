import { ShapeFlags } from '../shared/ShapeFlags'
import { createComponentInstance, setupComponent } from './component'
import { Fragment, Text } from './vnode'
import { createAppAPI } from './createApp';
import { effect } from '../reactivity/effect';
import { EMPTY_OBJ } from '../shared';

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

    const oldProps = n1.props || EMPTY_OBJ
    const newProps = n2.props || EMPTY_OBJ
    const el = (n2.el = n1.el);

    patchPorps(el, oldProps, newProps);
  }


  function patchPorps(el, oldProps: any, newProps: any) {
    if (oldProps !== newProps) {
      // 有值 更新
      for (const key in newProps) {
        const prevProp = oldProps[key];
        const nextProp = newProps[key];
        if (prevProp !== nextProp) {
          hostPatchProp(el, key, prevProp, nextProp);
        }
      }
      if (oldProps !== EMPTY_OBJ) {
        // 无值 删除
        for (const key in oldProps) {
          if (!(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null);
          }
        }
      }
    }

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
    // 旧props有值，则更新
    for (const key in props) {
      const val = props[key]
      hostPatchProp(el, key, null, val)
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
