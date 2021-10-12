import { extend, isObject } from '../shared'
import { track, trigger } from './effect'
import { reactive, readonly, ReactiveFlags } from './reactive'
// 第一次进来就创建，不用每次都创建，缓存
const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)

/**
 * @description: 高阶函数，创建get
 * @param {*} isReadonly
 * @return {*}
 */
function createGetter(isReadonly = false, shallow = false) {
  return function get(target, key) {
    // 如果key是IS_REACTIVE直接返回
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
      // 如果key是IS_READONLY直接返回
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly
    }
    const res = Reflect.get(target, key)

    if (shallow) {
      return res
    }
    // 看看res是不是object，递归
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res)
    }
    if (!isReadonly) {
      // 只有非readonly才收集依赖
      track(target, key)
    }
    return res
  }
}

/**
 * @description: 高阶函数，创建set
 * @param {*}
 * @return {*}
 */
function createSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value)
    // TODO触发依赖
    trigger(target, key)
    return res
  }
}
/**
 * @description: reactive的handlers
 * @param {*}
 * @return {*}
 */
export const mutableHanders = {
  get,
  set
}
/**
 * @description: readonly的Handers
 * @param {*}
 * @return {*}
 */
export const readonlyHanders = {
  get: readonlyGet,
  set(target, key, value) {
    // 不可以set
    console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target)
    return true
  }
}
/**
 * @description: shallowReadonlyhandlers
 * @param {*}
 * @return {*}
 */
export const shallowReadonlyhandlers = extend({}, readonlyHanders, {
  get: shallowReadonlyGet
})
