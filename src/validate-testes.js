import chalk from "chalk";
// ESTE CÓDIGO ESTÁ NA CLI.JS FUNCIONANDO
const gitHub = {
  title: "Profile Vanessa",
  href: "https://github.com/vanessap91",
};

const validate = (link) => {
  return fetch(link.href)
    .then((response) => {
      const linkData = {
        title: link.title,
        href: link.href,
        status: response.status,
        statusText: response.statusText,
      };
      console.log(
        chalk.bold.bgYellow(linkData.title),
        chalk.blueBright(linkData.href),
        chalk.gray(linkData.status),
        chalk.green(linkData.statusText)
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
};

validate(gitHub);

// console.log(validate(gitHub));
// resposta: Promise { <pending> }

// export { validate };
