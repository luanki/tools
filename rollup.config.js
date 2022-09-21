import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

import pkg from './package.json';
const libName = pkg.name;

export default [
  {
    input: 'src/index.ts', // 打包入口
    // 打包出口
    output: [
      {
        file: `dist/cjs/index.js`,
        // commonjs格式
        format: 'cjs',
      },
      {
        file: `dist/es/index.js`,
        // es module
        format: 'es',
      },
      {
        file: `dist/umd/index.js`,
        // 通用格式可以用于node和browser等多个场景
        format: 'umd',

        // 注意如果是umd格式的bundle的话name属性是必须的，这时可以在script标签引入后window下会挂载该属性的变量来使用你的类库方法
        name: libName,
      },
      {
        file: `dist/index.d.ts`,
        format: 'es',
      },
    ],
    plugins: [
      // 打包插件
      resolve(), // 查找和打包node_modules中的第三方模块
      commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
      typescript(),
    ],
  },
  {
    input: `src/index.ts`,
    plugins: [dts()],
    output: {
      file: `dist/index.d.ts`,
      format: 'es',
    },
  },
];
