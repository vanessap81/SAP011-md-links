// verificar os tipos de erros com o fetch
// criar constantes com tipos de status: ok ou fail
// criar função que receba o código do status e retorne uma mensagem: ok ou fail

// ESTE CÓDIGO ESTÁ NA CLI.JS FUNCIONANDO

// para exportar, criar uma função e atribuir a uma const

const validateLinks = (results) =>
  Promise.all(
    results.map((link) =>
      fetch(link.href)
        .then((response) => {
          const linkData = {
            title: link.title,
            href: link.href,
            file: link.file,
            status: response.status,
            statusText: response.statusText,
          };
          return linkData;
        })
        .catch((error) => {
          const linkData = {
            status: error.code,
            statusText: error.message,
          };
          return linkData;
        })
    )
  );
export default validateLinks;
