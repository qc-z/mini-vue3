import { extend } from '../shared'
let activeEffect
let shouldTrack
const targetMap = new Map()

export class ReactiveEffect {
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
    // 调用stop后，active为false，不收集依赖，只需要调用一下fn即可
    if (!this.active) {
      return this._fn()
    }
    // 只有run之后才有activeEffect，dep才能收集进去
    activeEffect = this
    // 把开关打开，之后调用fn，触发get方法，进行依赖收集
    shouldTrack = true
    const result = this._fn()
    // 把shouldTrack变为false，重置一下状态，只有active为true才打开shouldTrack，进行依赖收集
    shouldTrack = false
    return result
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
/**
 * @description: 调用stop之后，清除deps收集的effext
 * @param {*} effect
 * @return {*}
 */
function cleanupEffect(effect) {
  effect.deps.forEach((dep: any) => {
    // effect 是set
    dep.delete(effect)
  })
  // MARK: 清空
  effect.deps.length = 0
}

export function effect(fn, options: any = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler)
  // 后面不确定的options自动合并在ReactiveEffect类上
  extend(_effect, options)
  // effect收集进来先跑一编
  _effect.run()
  // 这个runner就是stop的runner bind为了防止runner调用this指向不正确
  const runner: any = _effect.run.bind(_effect)
  // 挂载effect在runner上，stop里面要调用_effect的stop方法
  runner.effect = _effect
  return runner
}

export function track(target, key) {
  if (!isTracking()) return
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
  trackEffects(dep)
}
export function trackEffects(dep) {
  // 优化
  if (dep.has(activeEffect)) return
  dep.add(activeEffect)
  // 反向收集dep
  activeEffect.deps.push(dep)
}

export function isTracking() {
  return shouldTrack && activeEffect !== undefined
}

export function trigger(target, key) {
  let depsMap = targetMap.get(target)
  let dep = depsMap.get(key)
  // MARK: 依赖没有effect，但是触发了set操作，这里会报错(边缘case)
  dep && triggerEffects(dep)
}

export function triggerEffects(dep) {
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}

export function stop(runner) {
  // 在触发依赖的时候就把effect删除掉
  // 指向stop方法
  runner.effect.stop()
}
