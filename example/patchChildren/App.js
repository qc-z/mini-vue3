import { h } from "../../lib/mini-vue.esm.js"
import TextToText from "./TextToText.js"
import TextToArray from "./TextToArray.js"
import ArrayToArray from "./ArrayToArray.js"
import ArrayToText from "./ArrayToText.js"

export const App = {
  name: "App",
  setup() {

  },
  render() {
    return h("div", { tId: 1 },
      [
        h('span', {}, '主页'),
        // h(TextToText),
        // h(TextToArray),
        h(ArrayToArray),
        // h(ArrayToText)
      ]
    )
  },
}
