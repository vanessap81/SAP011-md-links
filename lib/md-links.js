import { readFile } from 'fs';
import path from 'path';
import linkObject from './checkLinks.js';
import validateLinks from "./validate.js";
import { statsFunction, statsAndValidate } from "./stats.js";


const mdLinks = (filePath, option = {}) => {
  const fileExtension = path.extname(filePath);
  return new Promise((resolve, reject) => {
    if (fileExtension === '.md') {
      readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(new Error('O caminho não pode ser lido '));
        } else {
          const urlRegex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
          const regexFilter = data.match(urlRegex);
          if (regexFilter !== null) {
            const results = linkObject(regexFilter, filePath);
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
          } else {
            reject(new Error('O arquivo não contém links '));
          }
        }
      });
    } else {
      reject(new Error('A extensão do arquivo não é .md '));
    }
  });
};

export { mdLinks };
