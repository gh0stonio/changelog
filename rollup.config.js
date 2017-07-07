import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import cli from 'rollup-plugin-cli'
import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/main.js',
  dest: 'bin/changelog.js',
  format: 'cjs',
  plugins: [
    json(),
    resolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    cli()
  ],
  external: ['events', 'child_process', 'fs', 'path', 'os']
}
