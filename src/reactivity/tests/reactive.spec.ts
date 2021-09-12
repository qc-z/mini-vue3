import { reactive } from '../reactive'
describe('reactive', () => {
  it('happy path', () => {
    const origin = { foo: 1 }
    const observed = reactive(origin)
    expect(observed).not.toBe(origin)
    expect(observed.foo).toBe(1)
  })
})
