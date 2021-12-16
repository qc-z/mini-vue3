import pkg from './package.json'
import typescript from '@rollup/plugin-typescript'
export default {
  input: 'src/index.ts',
  output: [
    // 1 cjs ->commomjs
    // 2 esm -> es6
    {
      format: 'cjs',
      file: pkg.main,
    },
    {
      format: 'esm',
      file: pkg.module,
    }
  ],
  plugins: [typescript()]
}