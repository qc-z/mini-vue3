import { reactive } from '../reactive'
import { effect, stop } from '../effect'

describe('effect', () => {
  it('happy path', () => {
    const user = reactive({
      age: 10,
      name: '张三'
    })
    let nextAge
    let a
    effect(() => {
      nextAge = user.age + 1
      a = user.name + 1
    })
    expect(nextAge).toBe(11)
    // update
    user.age++
    expect(nextAge).toBe(12)
  })
  it('should bu return runner', () => {
    // 1 调用effect会返回一个函数(runner)，调用该函数会运行一次effect内部的fn
    // 2 调用runner会返回fn的返回值
    let foo = 10
    const runner = effect(() => {
      foo++
      return 'foo'
    })
    expect(foo).toBe(11)
    const r = runner()
    expect(r).toBe('foo')
  })
  // 实现一个scheduler
  it('scheduler', () => {
    // scheduler功能
    // 1 通过effect的第二个参数给定一个schedluer的函数fn
    // 2 effect第一次执行的时候还会执行fn(第一个参数不是scheduler的fn)
    // 3 当响应式对象set的时候就是更新的时候，不会执行fn而是执行scheduler
    // 4 如果执行runner(effect返回值)的时候，会再次执行fn(第一个参数，不是scheduler的fn)
    let dummy
    let run: any
    const scheduler = jest.fn(() => {
      run = runner
    })
    const obj = reactive({ foo: 1 })
    const runner = effect(
      () => {
        dummy = obj.foo
      },
      { scheduler }
    )
    // 第一次不会被执行
    expect(scheduler).not.toHaveBeenCalled()
    // fn正常执行
    expect(dummy).toBe(1)
    // 更新响应式时fn不会被执行 scheduler被执行
    obj.foo++
    expect(scheduler).toHaveBeenCalledTimes(1)
    expect(dummy).toBe(1)
    run()
    expect(dummy).toBe(2)
  })
  // 实现一个stop
  it('stop', () => {
    let dummy
    const obj = reactive({
      prop: 1
    })
    const runner = effect(() => {
      dummy = obj.prop
    })
    obj.prop = 2
    expect(dummy).toBe(2)
    stop(runner)
    obj.prop = 3
    expect(dummy).toBe(2)
    // 再次运行effect
    runner()
    expect(dummy).toBe(3)
  })
  // 实现一个onStop，stop的回调函数
  it('onStop', () => {
    const obj = reactive({
      foo: 1
    })
    const onStop = jest.fn()
    let dummy
    const runner = effect(
      () => {
        dummy = obj.foo
      },
      {
        onStop
      }
    )

    stop(runner)
    expect(onStop).toBeCalledTimes(1)
  })
})
