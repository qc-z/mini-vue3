import { mutableHanders, readonlyHanders } from './baseHandlers'
export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly'
}
export function reactive(raw) {
  return createActiveObject(raw, mutableHanders)
}
export function isReactive(value) {
  return !!value[ReactiveFlags.IS_REACTIVE]
}
export function readonly(raw) {
  return createActiveObject(raw, readonlyHanders)
}

export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONLY]
}

function createActiveObject(target, baseHandlers) {
  return new Proxy(target, baseHandlers)
}
