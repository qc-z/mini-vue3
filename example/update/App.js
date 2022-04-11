import { h, ref } from "../../lib/mini-vue.esm.js"

export const App = {
  name: "App",

  setup() {
    const count = ref(0)
    const onClick = () => {
      count.value++
    }

    const props = ref({
      foo: 'foo',
      bar: 'bar'
    })
    //props修改
    const onChangePropsDemo1 = () => {
      props.value.foo = 'new-foo'
    }
    //props值变成了 undefined - 删除
    const onChangePropsDemo2 = () => {
      props.value.foo = undefined

    }
    //props删除
    const onChangePropsDemo3 = () => {
      props.value = {
        foo: "foo",
      }
    }
    return {
      count,
      onClick,
      props,
      onChangePropsDemo1,
      onChangePropsDemo2,
      onChangePropsDemo3
    }
  },
  render() {
    return h(
      "div",
      {
        id: "root",
        ...this.props
      },
      [
        h("div", {}, "count:" + this.count), // 依赖收集
        h(
          "button",
          {
            onClick: this.onClick,
          },
          "click"
        ),
        h(
          "button",
          {
            onClick: this.onChangePropsDemo1,
          },
          "props修改"
        ),
        h(
          "button",
          {
            onClick: this.onChangePropsDemo2,
          },
          "changeProps - 值变成了 undefined - 删除"
        ),
        h(
          "button",
          {
            onClick: this.onChangePropsDemo3,
          },
          "changeProps - key 在新的里面没有了 - 删除"
        ),
      ]
    )
  },
}
