import { readFile } from 'fs';
import validateLinks from "./validate.js";
import { statsFunction, statsAndValidate } from "./stats.js";

// const fileExtension = file.extname();

const mdLinks = (filePath, option = {}) => {
  const urlRegex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;

  return new Promise((resolve, reject) => {
    readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err.message);
      } else {
        const regexFilter = data.match(urlRegex);
        const results = regexFilter.map((link) => {
          const title = link.match(/\[([^[\]]*?)\]/)[1];
          const href = link.match(/\((http.*)\)/)[1];
          return {
            title,
            href,
            file: filePath,
          };
        });
        if (option.validate && !option.stats) {
          resolve(validateLinks(results));
        } else if (option.stats && !option.validate) {
          validateLinks(results)
            .then((result) => {
              resolve(statsFunction(result));
            });
        } else if (option.validate && option.stats) {
          validateLinks(results)
            .then((result) => {
              resolve(statsAndValidate(result));
            });
        } else {
          resolve(results);
        }
      }
    });
  });
};

export { mdLinks };
