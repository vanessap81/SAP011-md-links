import { readFile } from "fs";

const mdLinks = (filePath) => {
  const urlRegex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const results = [];

  return new Promise((resolve, reject) => {
    //Leitura do aquivo aqui
    readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err.message);
      } else {
        
        const regex = data.match(urlRegex);
        regex.forEach((index) => {
          const title = index.match(/\[([^[\]]*?)\]/)[1];
          const href = index.match(/\((http.*)\)/)[1];
          results.push({ title, href });
        });
        
    //Validação dos links
    
      resolve(results);
      }
    });
  });

};

export { mdLinks };