import { extend } from '../shared'

class ReactiveEffect {
  private _fn: any
  deps = []
  active = true
  onStop?: () => void
  public scheduler: Function | undefined
  // public外部可以引用 ？可选
  constructor(fn, scheduler?: Function) {
    this._fn = fn
    this.scheduler = scheduler
  }
  run() {
    // 只有run之后才有activeEffect，dep才能收集进去
    activeEffect = this
    return this._fn()
  }
  stop() {
    // 防止多次stop，一个实例调用一次stop就应该移除掉这个dep
    if (this.active) {
      cleanupEffect(this)
      if (this.onStop) {
        this.onStop()
      }
      this.active = false
    }
  }
}
function cleanupEffect(effect) {
  effect.deps.forEach((dep: any) => {
    // effect 是set
    dep.delete(effect)
  })
}
/**
 * @description: 收集依赖
 * @param {*} trage
 * @param {*} key
 * @return {*}
 */
const targetMap = new Map()
let activeEffect

export function track(target, key) {
  // 一个taget对应一个key new Map()
  // 一个key对应一个dep new Map()
  // dep里面依赖是不能重复的 new Set()
  // 拿到以key为基准的map集合
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    //初始化
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    //初始化
    dep = new Set()
    depsMap.set(key, dep)
  }
  // TODO??
  if (!activeEffect) return

  dep.add(activeEffect)

  // 反向收集dep
  activeEffect.deps.push(dep)
}
export function trigger(target, key) {
  let depsMap = targetMap.get(target)
  let dep = depsMap.get(key)
  // MARK: 依赖没有effect，但是触发了set操作，这里会报错
  dep && triggerEffects(dep)
}
function triggerEffects(dep) {
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}

export function effect(fn, options: any = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler)
  // _effect.onStop = options.onStop
  extend(_effect, options)
  _effect.run()
  // 这个runner就是stop的runner bind为了防止runner调用this指向不正确
  const runner: any = _effect.run.bind(_effect)
  // 挂载effect在runner上
  runner.effect = _effect
  return runner
}

export function stop(runner) {
  // 在触发依赖的时候就把effect删除掉
  // 指向stop方法
  runner.effect.stop()
}
