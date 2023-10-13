if (!process.argv[3]) {
  mdLinks(file).then((results) => {
    results.forEach((result) => {
      console.log(
        chalk.bold.bgYellow(result.title),
        result.href,
        chalk.bgBlue("Arquivo: "),
        result.file
      );
    });
  });
} else if (option.validate) {
  // console.log("There is a validate request");
  results.forEach((object) => {
    validate(object.href);
  });
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
