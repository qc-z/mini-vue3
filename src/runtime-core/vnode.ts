import { ShapeFlags } from '../shared/shapeFlags'

export function createdVnode(type, props?, children?) {
  const vnode = {
    type,
    props,
    children,
    shapeFlag: getFlags(type),
    el: null
  }
  if (typeof children === 'string') {
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN
  } else if (Array.isArray(children)) {
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN
  }
  return vnode
}
function getFlags(type) {
  return typeof type === 'string' ? ShapeFlags.ELEMENT : ShapeFlags.STATEFUL_COMPONENT
}
