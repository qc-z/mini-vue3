import { isObject } from '../shared'
import { track, trigger } from './effect'
import { reactive, readonly, ReactiveFlags } from './reactive'
const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)

function createGetter(isReadonly = false) {
  return function get(target, key) {
    // 如果key是IS_REACTIVE直接返回
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
      // 如果key是IS_READONLY直接返回
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly
    }
    const res = Reflect.get(target, key)
    // 看看res是不是object
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res)
    }
    if (!isReadonly) {
      // TODO 收集依赖
      track(target, key)
    }

    return res
  }
}
function createSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value)
    // TODO触发依赖
    trigger(target, key)
    return res
  }
}
export const mutableHanders = {
  get,
  set
}
export const readonlyHanders = {
  get: readonlyGet,
  set(target, key, value) {
    // 不可以set

    return true
  }
}
