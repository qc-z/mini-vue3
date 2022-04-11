import { createRenderer } from '../runtime-core'

function createElement(type) {
  return document.createElement(type)
}
function patchProp(el, key, prevVal, nextProp) {
  const isOn = (key: string) => /^on[A-Z]/.test(key)
  if (isOn(key)) {
    const event = key.slice(2).toLowerCase()
    el.addEventListener(event, nextProp)
  } else {
    // nextProp是 null 或者 undefined 则删除
    if (nextProp === null || nextProp === undefined) {
      el.removeAttribute(key)
    } else {
      el.setAttribute(key, nextProp)
    }
  }
}
function insert(el, container) {
  container.appendChild(el)
}
function setElementText(el, text) {
  el.textContent = text
}
function remove(child) {
  const parent = child.parentNode
  if (parent) {
    parent.removeChild(child)
  }
}

const render: any = createRenderer({
  createElement,
  patchProp,
  insert,
  setElementText,
  remove
})

export function createApp(...args) {
  return render.createApp(...args)
}

export * from "../runtime-core";
