#! /usr/bin/env node

import chalk from 'chalk';
import { mdLinks } from './src/md-links.js';
import stats from './src/stats.js';
// o segundo argumento digitado será capturado para análise
const file = process.argv[2];
// console.log(process.argv[1]); C:\Users\vanes\AppData\Roaming\npm\node_modules\md-links\cli.js
// console.log(process.argv[0]); C:\Program Files\nodejs\node.exe

const option = {
  validate: '--validate',
  stats: '--stats',
};

// const fileExtension = file.extname();

mdLinks(file, option).then((results) => {
  if (!process.argv[3]) {
    results.forEach((result) => {
      console.log(
        chalk.bold.bgYellow(result.file),
        result.href,
        chalk.yellow(result.title)
      );
    });
  } else if (process.argv[3] === option.validate) {
    results.forEach((link) => {
      console.log(
        chalk.bold.bgYellow(link.file),
        link.href,
        chalk.bold.green(link.statusText),
        chalk.green(link.status),
        chalk.blue(link.title)
      );
    });
  } else if (process.argv[3] === option.stats) {
    // console.log('Comando inválido');
    console.log(results.total, results.broken);
  } else {
    console.log('Comando inválido');
  }
});
