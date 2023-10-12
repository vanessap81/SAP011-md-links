import { error } from "console";
import { readFile } from "fs";
// import { getStatus } from "./validate-links.js";

const mdLinks = (filePath) => {
  const urlRegex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const results = [];

  return new Promise((resolve, reject) => {
    //Leitura do aquivo aqui
    readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err.message);
      } else {
        const regexFilter = data.match(urlRegex);

        const linksList = regexFilter.map((link) => {
          const title = link.match(/\[([^[\]]*?)\]/)[1];
          const href = link.match(/\((http.*)\)/)[1];
          return {
            title,
            href,
            file: filePath,
          };
        });
        resolve(linksList);
      }
    });
  });
};

export { mdLinks };
