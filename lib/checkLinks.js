import { readFile } from 'fs';

const isThereLink = (filePath) => {
  const urlRegex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  readFile(filePath, 'utf8', (err, data) => {
    const regexFilter = data.match(urlRegex);
    return regexFilter;
  });
}

export default isThereLink;