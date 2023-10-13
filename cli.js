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

mdLinks(file).then((results) => {
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
      fetch(link.href)
        .then((response) => {
          const linkData = {
            title: link.title,
            href: link.href,
            file: file,
            status: response.status,
            statusText: response.statusText,
          };
          console.log(
            chalk.bold.bgYellow(linkData.file),
            linkData.href,
            chalk.bold.green(linkData.statusText),
            chalk.green(linkData.status),
            chalk.blue(linkData.title)
          );
          // return linkData;
        })
        .catch((error) => {
          const linkData = {
            status: error.code,
            statusText: error.message,
          };
          console.log(chalk.bold.bgRed(linkData.statusText));
          return linkData;
        });
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
