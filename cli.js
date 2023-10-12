#! /usr/bin/env node

import chalk from "chalk";
import { mdLinks } from "./src/md-links.js";

// o segundo argumento digitado será capturado para análise
const file = process.argv[2];
// console.log(process.argv[2]); ./src/links.md
// console.log(process.argv[1]); C:\Users\vanes\AppData\Roaming\npm\node_modules\md-links\cli.js
// console.log(process.argv[0]); C:\Program Files\nodejs\node.exe

// verificar se a digitação inclui uma das opções
const option = {
  validate: process.argv.includes("--validate"),
  stats: process.argv.includes("--stats"),
};

mdLinks(file, option).then((results) => {
  if (file && !option) {
    results.forEach((result) => {
      console.log(
        chalk.bold.bgYellow(result.title),
        result.href,
        chalk.bgBlue("Arquivo: "),
        result.file
      );
    });
  } else if (option.validate) {
    results.forEach((result) => {
      console.log(
        chalk.bold.bgYellow(result.title),
        result.href,
        chalk.bgBlue("Arquivo: "),
        result.file
      );
    });
    console.log("There is a validate request");
  } else if (option.stats) {
    results.forEach((result) => {
      console.log(
        chalk.bold.bgYellow(result.title),
        result.href,
        chalk.bgBlue("Arquivo: "),
        result.file
      );
    });
    console.log("There is a stats request");
  } else {
    console.log("Comando inválido");
  }
});
