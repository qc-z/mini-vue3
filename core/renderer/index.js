export function mountElement(vnode, container) {
  const { tag, props, children } = vnode
  // 1 tag
  const el = document.createElement(tag)
  // 2 props
  if (props) {
    for (const key in props) {
      const value = props[key]
      el.setAttribute(key, value)
    }
  }

  // 3 children
  if (typeof children === 'string') {
    const textNode = document.createTextNode(children)
    el.append(textNode)
  }
  if (Array.isArray(children)) {
    children.forEach((e) => {
      mountElement(e, el)
    })
  }
  container.append(el)
}
