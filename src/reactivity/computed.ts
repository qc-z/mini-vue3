import { ReactiveEffect } from './effect'

class computedRefImpl {
  private _getter: any
  private _dirty: boolean = true
  private _value: any
  private _effect: ReactiveEffect
  constructor(getter) {
    this._getter = getter
    // 此处不运行run方法，只运行scheduler
    // 只有在get的时候判断this._dirty状态才去调用run方法
    this._effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true
      }
    })
  }
  get value() {
    // 什么时候打开_dirty,锁上
    if (this._dirty) {
      this._dirty = false
      this._value = this._effect.run()
    }
    return this._value
  }
}
export function computed(getter) {
  return new computedRefImpl(getter)
}
