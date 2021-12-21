export function createdVnode(type, props?, children?) {
  const vnode = {
    type,
    props,
    children,
    el: null
  }
  return vnode
}
