import { mutableHanders, readonlyHanders, shallowReadonlyhandlers } from './baseHandlers'
/**
 * @description: reactive类型枚举
 * @param {*}
 * @return {*}
 */
export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly'
}
/**
 * @description: reactive
 * @param {*} raw
 * @return {*}
 */
export function reactive(raw) {
  return createActiveObject(raw, mutableHanders)
}
/**
 * @description: readonly
 * @param {*} raw
 * @return {*}
 */
export function readonly(raw) {
  return createActiveObject(raw, readonlyHanders)
}
export function shallowReactive(raw) {
  return createActiveObject(raw, shallowReadonlyhandlers)
}
/**
 * @description: isReactive
 * @param {*} value
 * @return {*}
 */
export function isReactive(value) {
  return !!value[ReactiveFlags.IS_REACTIVE]
}
/**
 * @description: isReadonly
 * @param {*} value
 * @return {*}
 */
export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONLY]
}
/**
 * @description: 判断是reactive和readonly
 * @param {*} value
 * @return {*}
 */
export function isProxy(value) {
  return isReactive(value) || isReadonly(value)
}

/**
 * @description: createActiveObject
 * @param {*} target
 * @param {*} baseHandlers
 * @return {*}
 */
function createActiveObject(target, baseHandlers) {
  return new Proxy(target, baseHandlers)
}
