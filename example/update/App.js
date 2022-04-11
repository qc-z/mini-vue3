import { h, reactive } from "../../lib/mini-vue.esm.js"

export const App = {
  name: "App",

  setup() {
    const count = reactive({
      test: 3
    })
    const onClick = () => {
      count.test++
    }
    // let dummy
    // setInterval(() => {
    //   effect(() => {
    //     count.value++
    //     dummy = count.value
    //   })
    //   console.log(dummy, 'dummy')
    // }, 3000)
    return {
      count,
      onClick,
    }
  },
  render() {
    return h(
      "div",
      {
        id: "root",
      },
      [
        h("div", {}, "count:" + this.count.test), // 依赖收集
        h(
          "button",
          {
            onClick: this.onClick,
          },
          "click"
        ),
      ]
    )
  },
}
