#! /usr/bin/env node

import chalk from 'chalk';
import { mdLinks } from './src/md-links.js';

const file = process.argv[2];
// console.log(process.argv[1]); C:\Users\vanes\AppData\Roaming\npm\node_modules\md-links\cli.js
// console.log(process.argv[0]); C:\Program Files\nodejs\node.exe

const option = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
  statsAndValidade: process.argv.includes('--stats', '--validate'),
};
// console.log(option);
// const fileExtension = file.extname();

mdLinks(file, option)
  .then((results) => {
    if (!process.argv[3]) {
      results.forEach((result) => {
        console.log(
          chalk.bold.bgYellow(result.file),
          result.href,
          chalk.yellow(result.title)
        );
      });
    } else if (option.validate && !option.stats) {
      results.forEach((link) => {
        console.log(
          chalk.bold.bgYellow(link.file),
          link.href,
          chalk.bold.green(link.statusText),
          chalk.green(link.status),
          chalk.blue(link.title)
        );
      });
    } else if (option.stats && !option.validate) {
      // console.log(results);
      console.log(chalk.black.bgGreen('Total:'), chalk.green(results.total));
    } else if (option.statsAndValidade) {
      // console.log(results);
      console.log(chalk.black.bgGreen('Total:'), chalk.green(results.total), chalk.black.bgGreen('Broken:'), chalk.green(results.broken));
    } else {
      console.log('Comando inválido');
    }
})
