import vue from 'rollup-plugin-vue'
import babel from '@rollup/plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import copyTo from 'rollup-plugin-copy-assets-to'

export default {
  input: 'src/index.js',
  output: {
    file: 'npm/dist/index.js',
    format: 'umd',
    name: 'el-form-schema',
    globals: {
      vue: 'Vue'
    }
  },
  external: ['vue', 'element-ui'],
  cache: true,
  treeshake: false,
  plugins: [
    vue({ css: false }),
    babel(),
    commonjs(),
    terser(),
    copyTo({
      assets: ['./src', 'README.md'],
      outputDir: 'npm/'
    })
  ]
}
