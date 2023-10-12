#! /usr/bin/env node

import chalk from "chalk";
import { mdLinks } from "./src/md-links.js";

// o segundo argumento digitado será capturado para análise
const file = process.argv[2];
// console.log(process.argv[2]); ./src/links.md
// console.log(process.argv[1]); C:\Users\vanes\AppData\Roaming\npm\node_modules\md-links\cli.js
// console.log(process.argv[0]); C:\Program Files\nodejs\node.exe

mdLinks(file).then((results) => {
  results.forEach((result) => {
    console.log(
      chalk.bold.bgYellow(result.title),
      result.href
      // chalk.bgRed(result.status)
    );
  });
});
