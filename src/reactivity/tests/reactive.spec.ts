import { isReactive, reactive } from '../reactive'
describe('reactive', () => {
  it('happy path', () => {
    const origin = { foo: 1 }
    const observed = reactive(origin)
    expect(observed).not.toBe(origin)
    expect(observed.foo).toBe(1)
    expect(isReactive(observed)).toBe(true)
    expect(isReactive(origin)).toBe(false)
  })
})
