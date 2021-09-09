// 1 先声明一个依赖收集类 deep
class Dep {
  constructor(value) {
    this.reactives = new Set()
    this._val = value
  }
  get value() {
    this.track()
    return this._val
  }
  set value(newValue) {
    this._val = newValue
    this.trigger()
  }
  // 收集依赖
  track() {
    if (currentEffect) {
      this.reactives.add(currentEffect)
    }
  }
  // 触发依赖
  trigger() {
    this.reactives.forEach((effect) => {
      effect()
    })
  }
}
// 全局变量联系两个函数Dep和effectWatch
let currentEffect
// 全局变量Map储存
let targetMap = new Map()

function getDep(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Dep()
    depsMap.set(key, dep)
  }
  return dep
}
// 2 effectWatch 函数
export function effectWatch(effect) {
  currentEffect = effect
  effect()
  currentEffect = null
}
// reactive
// dep -> number string
// object -> key -> dep
// 1 这个对象在什么时候改变
// object.a -> get
// Object.a =a -> set
// vue2 defineProperty
// vue3 proxy
export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      const dep = getDep(target, key)
      dep.track()
      // key -> dep
      return Reflect.get(target, key)
    },
    set(target, key, value) {
      // 触发依赖
      // 获取dep
      const dep = getDep(target, key)
      const result = Reflect.set(target, key, value)
      dep.trigger()
      return result
    }
  })
}
