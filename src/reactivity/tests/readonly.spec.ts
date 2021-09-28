import { isReadonly, readonly } from '../reactive'

describe('readonly', () => {
  it('happy path', () => {
    const origin = { foo: 1, bar: { baz: 2 } }
    const wrapper = readonly(origin)
    expect(wrapper).not.toBe(origin)
    expect(isReadonly(wrapper)).toBe(true)
    expect(wrapper.foo).toBe(1)
  })
  it('warn then call set', () => {
    console.warn = jest.fn()
    const user = readonly({ age: 10 })
    user.age = 11
    expect(console.warn).toBeCalled()
  })
})
