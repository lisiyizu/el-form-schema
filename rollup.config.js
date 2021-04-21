import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import copyTo from 'rollup-plugin-copy-assets-to';

export default {
  input: 'src/index.js',
  output: {
    file: 'npm/dist/index.js',
    format: 'umd',
    name: 'el-form-schema'
  },
  cache: true,
  treeshake: false,
  plugins: [
    commonjs(),
    vue(),
    terser(),
    copyTo({
      assets: [
        './src'
      ],
      outputDir: 'npm/'
    }),
  ]
}
