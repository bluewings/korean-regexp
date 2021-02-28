import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';

const pkg = require('./package.json');

const rollupConfig = {
  input: 'src/index.ts',
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: { declaration: true },
        exclude: ['**/*.test.ts'],
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
  plugins: [...rollupConfig.plugins, commonjs()],
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
