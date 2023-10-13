#! /usr/bin/env node

import chalk from "chalk";
import { mdLinks } from "./src/md-links.js";
// import { validate } from "./src/validate-links.js";

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

// Possibilidade: criar função que comece do If... else (condição: existencia de options) para selecionar a função stats ou validate

mdLinks(file, option).then((results) => {
  if (!process.argv[3]) {
    results.forEach((result) => {
      console.log(
        chalk.bold.bgYellow(result.file),
        result.href,
        chalk.yellow(result.title)
      );
    });
  } else if (option.validate) {
    results.forEach((link) => {
      console.log(
        chalk.bold.bgYellow(link.file),
        link.href,
        chalk.bold.green(link.statusText),
        chalk.green(link.status),
        chalk.blue(link.title)
      );
    });
  } else if (option.stats) {
    results.forEach((result) => {
      console.log(
        chalk.bold.bgYellow(result.file),
        result.href,
        chalk.yellow(result.title)
      );
    });
    console.log("There is a stats request");
  } else {
    console.log("Comando inválido");
  }
});
