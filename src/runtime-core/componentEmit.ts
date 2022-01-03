import { cameliz, toHandlerKey } from '../shared'

export function emit(instance, event: string, ...args: any[]) {
  // instance.props --> event
  // 用户要传的是emit(event),instance是无感知的，所以要用到bind
  const { props } = instance
  // TPP,先写一个特例，再写一个通用的
  // add->Add
  const str = event.charAt(0).toUpperCase() + event.slice(1)

  const handler = props[toHandlerKey(cameliz(event))]
  handler && handler(...args)
}
