import { createdVnode } from './vnode'

export function h(type, props?, children?) {
  return createdVnode(type, props, children)
}
