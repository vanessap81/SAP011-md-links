import { error } from "console";
import { readFile } from 'fs';
import validateLinks from "./validate.js";

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
              const unique = [...new Set(result.map((link) => link.href))];
              const stats = {
                total: result.length,
                unique: unique.length,
              };
              resolve(stats);
            });
        } else if (option.validate && option.stats) {
          validateLinks(results)
            .then((result) => {
              const unique = [...new Set(result.map((link) => link.href))];
              const stats = {
                total: result.length,
                unique: unique.length,
                broken: result.filter((link) => link.status !== 200).length,
              };
              resolve(stats);
            });
        } else {
          resolve(results);
        }
      }
    });
  });
};

export { mdLinks };
