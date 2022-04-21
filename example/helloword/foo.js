import { h } from '../../lib/mini-vue.esm.js';

export const Foo = {
  setup(props) {
    console.log('Foo props show', props);
    props.count++;
    // 1在setup接收props
    // 在render通过this获取值
    // props必须是shallreadonly
  },
  render() {
    return h('div', {}, 'foo:' + this.count);
  },
};
