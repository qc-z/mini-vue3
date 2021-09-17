import { mutableHanders, readonlyHanders } from './baseHandlers'

export function reactive(raw) {
  return createActiveObject(raw, mutableHanders)
}
export function readonly(raw) {
  return createActiveObject(raw, readonlyHanders)
}
function createActiveObject(raw: any, baseHandlers) {
  return new Proxy(raw, baseHandlers)
}
