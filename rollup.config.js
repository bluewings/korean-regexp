import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';

const pkg = require('./package.json');

const rollupConfig = {
  input: 'src/index.ts',
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: { declaration: true },
      },
    }),
  ],
};

const cjs = {
  ...rollupConfig,
  output: {
    file: pkg.main,
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [...rollupConfig.plugins, resolve(), commonJS()],
};

const esm = {
  ...rollupConfig,
  output: {
    file: pkg.module,
    format: 'es',
    sourcemap: true,
  },
};

export default [cjs, esm];
