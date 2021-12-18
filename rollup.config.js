import pkg from './package.json'
import typescript from '@rollup/plugin-typescript'
export default {
  input: 'src/index.ts',
  output: [
    // 1 cjs ->commomjs
    {
      format: 'cjs',
      file: pkg.main
    },
    // 2 esm -> es6
    {
      format: 'esm',
      file: pkg.module
    }
  ],
  plugins: [typescript()]
}