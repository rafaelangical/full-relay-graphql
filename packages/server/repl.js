import 'esm';
import 'isomorphic-fetch';
import 'babel-polyfill';
import REPL from 'repl';
import replPromised from 'repl-promised';
import history from 'repl.history';

import { connectDatabase } from './src/database.ts';
import * as M from './src/model/index.ts';
import { generateToken } from './src/auth.ts';
// import babel from 'babel-core';
const babel = require('babel-core');

// based on https://gist.github.com/princejwesley/a66d514d86ea174270210561c44b71ba
/**
 * Preprocess repl command to wrap await inside an async function if needed
 * @param input
 * @returns {*}
 */
function preprocess(input) {
  const awaitMatcher = /^(?:\s*(?:(?:let|var|const)\s)?\s*([^=]+)=\s*|^\s*)(await\s[\s\S]*)/;
  const asyncWrapper = (code, binder) => {
    const assign = binder ? `global.${binder} = ` : '';
    return `(function(){ async function _wrap() { return ${assign}${code} } return _wrap();})()`;
  };

  // match & transform
  const match = input.match(awaitMatcher);
  if (match) {
    // eslint-disable-next-line
    input = `${asyncWrapper(match[2], match[1])}`;
  }
  return input;
}

function myEval(cmd, context, filename, callback) {
  const { code } = babel.transform(preprocess(cmd), {
    presets: [
      'flow',
      [
        'env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
    ],
    plugins: [['babel-plugin-transform-flow-strip-types']],
  });
  // eslint-disable-next-line
  _eval(code, context, filename, callback);
}

let _eval;

(async () => {
  try {
    const info = await connectDatabase();
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);

    const repl = REPL.start({
      prompt: 'awesome > ',
    });
    _eval = repl.eval;
    repl.eval = myEval;

    repl.context.M = M;
    repl.context.generateToken = generateToken;

    history(repl, `${process.env.HOME}/.node_history`);

    replPromised.promisify(repl);
  } catch (error) {
    console.error('Unable to connect to database');
    process.exit(1);
  }
})();
