import { computed } from '../computed'
import { reactive } from '../reactive'

describe('computed', () => {
  // 类似ref 使用的时候用.value

  it('happy path', () => {
    const user = reactive({
      age: 1
    })
    const age = computed(() => {
      return user.age
    })
    expect(age.value).toBe(1)
  })
  // 缓存机制
  it('should computed be lazily', () => {
    const value = reactive({
      foo: 1
    })
    const getter = jest.fn(() => {
      return value.foo
    })
    const cValue = computed(getter)
    //lazy 没有调用.value的时候getter函数不会调用
    expect(getter).not.toHaveBeenCalled()
    expect(cValue.value).toBe(1)
    expect(getter).toHaveBeenCalledTimes(1)

    // // 调用.value,只会触发get，结果应该会被缓存起来
    cValue.value
    // expect(getter).toHaveBeenCalledTimes(1)
    // 改变响应式对象值时，getter应该会调用一次
    value.foo = 2
    expect(getter).toHaveBeenCalledTimes(1)

    expect(cValue.value).toBe(2)

    // 调用cValue.value，getter再次调用
    expect(getter).toHaveBeenCalledTimes(2)

    //再缓存,getter不再调用
    cValue.value
    expect(getter).toHaveBeenCalledTimes(2)
  })
})
