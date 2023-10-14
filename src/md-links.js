import { error } from "console";
import { readFile } from 'fs';
import validateLinks from "./validate.js";
import stats from "./stats.js";

const mdLinks = (filePath, option) => {
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

        if (option.validate) {
          resolve(validateLinks(results));
        } if (option.stats) {
          resolve(stats(results));
        } else {
          resolve(results);
        }
      }
    });
  });
};

export { mdLinks };
