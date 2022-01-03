export const extend = Object.assign
export const isObject = (val) => {
  return val !== null && typeof val === 'object'
}
export const hasChanged = (newValue, value) => {
  return Object.is(newValue, value)
}

export const hasOwn = (val, key) => Object.prototype.hasOwnProperty.call(val, key)

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
export const toHandlerKey = (str: string) => {
  return str ? 'on' + capitalize(str) : ''
}
// add-foo --> addFoo
export const cameliz = (str: string) => {
  return str.replace(/-(\w)/g, (_, c: string) => {
    return c ? c.toUpperCase() : ''
  })
}
