import babel from 'rollup-plugin-babel';
import cjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';

import eslint from 'rollup-plugin-eslint';
import uglify from 'rollup-plugin-uglify';

import postcss from 'rollup-plugin-postcss';
import precss from 'precss';
import postcssImport from 'postcss-import';
import cssnext from 'postcss-cssnext';
import cssCustomMedia from 'postcss-custom-media';
import colorFunction from 'postcss-color-function';

export default {
  entry: 'src/app.js',
  dest: 'dist/bundle.js',
  format: 'iife',
  // format: 'cjs',
  sourceMap: true,
  plugins: [
    eslint({
      configFile: '.eslint.json',
      exclude: 'node_modules/**'
    }),
    resolve({
      browser: true,
      main: true,
      jsnext: true
    }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
      presets: [
        ['es2015', { modules: false }],
        'stage-2',
        'react'
      ]
    }),
    cjs({
      exclude: [
        'node_modules/process-es6/**',
        'node_modules/rollup-plugin-node-globals/**'
      ],
      // include: [
      //   'node_modules/react/**',
      //   'node_modules/react-dom/**',
      //   'node_modules/react-redux/**',
      //   'node_modules/react-router/**',
      //   'node_modules/react-tap-event-plugin/**',
      //   'node_modules/history/**',
      //   'node_modules/invariant/**',
      //   'node_modules/redux-logger/**',
      //   'node_modules/redux-thunk/**',
      //   'node_modules/redux/**'
      // ],
      namedExports : {
        'node_modules/react/react.js' : ['Component', 'PropTypes', 'createElement'],
        'node_modules/react-dom/index.js' : ['render']
      }
    }),
    globals(),
    replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    // postcss({
    //   plugins: [
    //     postcssImport(),
    //     cssCustomMedia(),
    //     precss(),
    //     cssnext(),
    //     colorFunction()
    //   ]
    // })
  ]
};
