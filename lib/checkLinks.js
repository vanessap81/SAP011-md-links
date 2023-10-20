const linkObject = (regexFilter, filePath) =>
  regexFilter.map((link) => {
  const title = link.match(/\[([^[\]]*?)\]/)[1];
  const href = link.match(/\((http.*)\)/)[1];
  return {
    title,
    href,
    file: filePath,
  }});

export default linkObject;