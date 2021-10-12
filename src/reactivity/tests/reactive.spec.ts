import { isReactive, reactive, isProxy } from '../reactive'
describe('reactive', () => {
  it('happy path', () => {
    const origin = { foo: 1 }
    const observed = reactive(origin)
    expect(observed).not.toBe(origin)
    expect(observed.foo).toBe(1)
    expect(isReactive(observed)).toBe(true)
    expect(isReactive(origin)).toBe(false)
    expect(isProxy(observed)).toBe(true)
  })
  test('nested reactive', () => {
    const original = {
      nested: { foo: 1 },
      array: [{ bar: 1 }]
    }
    const observed = reactive(original)
    expect(isReactive(observed.nested)).toBe(true)
    expect(isReactive(observed.array)).toBe(true)
    expect(isReactive(observed.array[0])).toBe(true)
  })
})
