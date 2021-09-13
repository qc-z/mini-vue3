class ReactiveEffect {
  private _fn: any
  // public外部可以引用 ？可选
  constructor(fn, public scheduler?) {
    this._fn = fn
  }
  run() {
    activeEffect = this
    return this._fn()
  }
}
/**
 * @description: 收集依赖
 * @param {*} trage
 * @param {*} key
 * @return {*}
 */
const targetMap = new Map()
export function track(trage, key) {
  // 一个taget对应一个key new Map()
  // 一个key对应一个dep new Map()
  // dep里面依赖是不能重复的 new Set()
  // 拿到以key为基准的map集合
  let depsMap = targetMap.get(trage)
  if (!depsMap) {
    //初始化
    depsMap = new Map()
    targetMap.set(trage, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    //初始化
    dep = new Set()
    depsMap.set(key, dep)
  }
  dep.add(activeEffect)
}
let activeEffect

export function effect(fn, options: any = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler)
  _effect.run()
  return _effect.run.bind(_effect)
}

export function trigger(target, key) {
  let depsMap = targetMap.get(target)
  let dep = depsMap.get(key)
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}
