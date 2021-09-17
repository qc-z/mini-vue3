import { track, trigger } from './effect'
const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)

function createGetter(isReadonly = false) {
  return function get(target, key) {
    const res = Reflect.get(target, key)
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
    console.warn('readonly not be set')
    return true
  }
}
