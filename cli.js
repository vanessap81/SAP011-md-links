#! /usr/bin/env node

import chalk from "chalk";
import { mdLinks } from "./src/index.js";

// o segundo argumento digitado será capturado para análise
const file = process.argv[2];

mdLinks(file)
    .then((results) => {
        results.forEach((result) => {
        console.log(chalk.bold.bgYellow(result.title), result.href);
        });
});