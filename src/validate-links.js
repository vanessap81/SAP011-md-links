// verificar os tipos de erros com o fetch
// criar constantes com tipos de status
// criar função que receba o código do status e retorne uma mensagem

const gitHub = {
  text: "PROFILE",
  href: "https://github.com/vanessap81",
};

function getStatus(link) {
  return fetch(link.href)
    .then((response) => {
      link.status = response.status;
      link.statusText = response.statusText;
      console.log(link);
    })
    .catch((error) => {
      link.status = error.code || "FAIL";
      link.statusText = error.message;
      return link;
    });
}

getStatus(gitHub);

// export { getStatus };
