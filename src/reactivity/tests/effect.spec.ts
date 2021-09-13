import { reactive } from '../reactive'
import { effect } from '../effect'

describe('effect', () => {
  it('happy path', () => {
    const user = reactive({
      age: 10
    })
    let nextAge
    effect(() => {
      nextAge = user.age + 1
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
})
