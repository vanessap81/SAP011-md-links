import { mdLinks } from "./md-links";

// verificar os tipos de erros com o fetch
// criar constantes com tipos de status: ok ou fail
// criar função que receba o código do status e retorne uma mensagem: ok ou fail

// ESTE CÓDIGO ESTÁ NA CLI.JS FUNCIONANDO

// para exportar, criar uma função e atribuir a uma const

mdLinks(file).then((results) => {
  // criar uma nova poromessa?
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
});
