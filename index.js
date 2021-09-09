import { reactive, effectWatch } from './core/reactivity/index.js'
const a = reactive({
  b: 11
})
let c
effectWatch(() => {
  c = a.b + 1
  console.log(c)
})
a.b = 20
