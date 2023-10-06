import { error } from "console";
import { readFile } from "fs";
// import { writeFile } from "fs";

// writeFile("./src/example.txt", "Um breve texto aqui", function (err) {
//   // Caso ocorra algum erro
//   if (err) {
//     return console.log("erro");
//   }

//   console.log("Arquivo criado");
// });

// readFile("./src/example.txt", "utf-8", function (err, data) {
//   console.log(data);
// });

// const urlRegex =
//   /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

// const urls = "https://www.freecodecamp.org";

// console.log(urlRegex.test(urls));

const getFile = async (fileName) => {
  try {
    const data = await readFile(fileName, "utf8", function (err, data) {
      console.log(`texto do documento: ${data}`);
    });
  } catch (error) {
    console.log(error);
  }
};

const textDoc = getFile("./src/example.txt");

// padrão para link em .md
// const regex = /\\[([^\\]]*)\\]\\((https?:\\/\\/[^$#\\s].[^\\s]*)\\)/gm

const findLinks = (text) => {
  const urlRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

  // const links = [];
  const oneLink = urlRegex.exec(text);

  console.log(`link do documento: ${oneLink}`);
};

findLinks(textDoc);
