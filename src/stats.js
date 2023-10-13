import { mdLinks } from "./md-links.js";

// verificar os tipos de erros com o fetch
// criar constantes com tipos de status
// criar função que receba o código do status e retorne uma mensagem

mdLinks(file).then((results) => {
  const linksArray = [];
  results.forEach((link) => {
    fetch(link.href)
      .then((response) => {
        const statsData = {
          title: link.title,
          href: link.href,
          file: file,
          status: response.status,
          statusText: response.statusText,
        };

        linksArray.push(statsData);

        // for para saber quantos ok e quantos fail
        for (let i = 0; i <= linksArray.length; i++) {
          let total = 0;
          if (linksArray[i].statusText === 200) {
            total = total + 1;
          }
        }

        // console.log(
        //   chalk.bold.bgYellow(statsData.file),
        //   stasData.href,
        //   chalk.bold.green(statsData.statusText),
        //   chalk.green(statsData.status),
        //   chalk.blue(statsData.title)
        // );

        // console.log(total: , Unique: );
      })

      .catch((error) => {
        const linkData = {
          status: error.code,
          statusText: error.message,
        };
        console.log(linkData);
      });
  });
});
