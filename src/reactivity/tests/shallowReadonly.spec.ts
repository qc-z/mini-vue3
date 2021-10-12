import { isReadonly, shallowReactive } from '../reactive'

describe('shallowReadonly', () => {
  it('should not make non-reactive properties reactive', () => {
    const props = shallowReactive({ n: { foo: 1 } })
    expect(isReadonly(props)).toBe(true)
    expect(isReadonly(props.n)).toBe(false)
  })
  it('warn then call set', () => {
    console.warn = jest.fn()
    const user = shallowReactive({ age: 10 })
    user.age = 11
    expect(console.warn).toBeCalled()
  })
})
