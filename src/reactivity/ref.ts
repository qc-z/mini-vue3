import { hasChanged, isObject } from '../shared'
import { isTracking, trackEffect, triggerEffects } from './effect'
import { reactive } from './reactive'

class refImpl {
  private _value: any
  public dep
  private _rawValue: any
  public __v_isRef = true
  constructor(value) {
    this._rawValue = value
    // 先判断value是不是一个对象
    this._value = convert(value)
    // 因为value是一个key对应一个dep 只需要dep就行
    this.dep = new Set()
  }
  get value() {
    trackRefValue(this)
    return this._value
  }
  set value(newValue) {
    // 值是一样的就不触发依赖
    if (hasChanged(newValue, this._rawValue)) return
    // 先去修改值再去触发依赖
    this._value = convert(newValue)

    this._rawValue = newValue
    triggerEffects(this.dep)
  }
}
function trackRefValue(ref) {
  //  依赖收集
  if (isTracking()) {
    trackEffect(ref.dep)
  }
}
function convert(value) {
  return isObject(value) ? reactive(value) : value
}
export function ref(value) {
  return new refImpl(value)
}

export function isRef(ref) {
  return !!ref.__v_isRef
}
export function unRef(ref) {
  return isRef(ref) ? ref.value : ref
}
