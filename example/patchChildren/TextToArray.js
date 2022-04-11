// @ts-nocheck
import { h, ref } from "../../lib/mini-vue.esm.js"

const prevChildren = "oldChild"
const nextChildren = [h("div", {}, "A"), h("div", {}, "B")]

export default {
  name: "App",
  setup() {
    const isChange = ref(false)
    window.isChange = isChange
    return {
      isChange
    }
  },
  render() {
    const self = this

    return self.isChange
      ? h("div", {}, nextChildren)
      : h("div", {}, prevChildren)
  }
}
