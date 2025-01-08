import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js', // 你的 SDK 源文件
  output: [
    {
      file: 'dist/openADJsSDK.cjs.js', // CommonJS 格式
      format: 'cjs',
    },
    {
      file: 'dist/openADJsSDK.esm.js', // ES Module 格式
      format: 'esm',
    },
    {
      file: 'dist/openADJsSDK.umd.js', // UMD 格式
      format: 'umd',
      name: 'openADJsSDK', // 浏览器全局变量名
    },
  ],
  plugins: [resolve(), commonjs()],
};