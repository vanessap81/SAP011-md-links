const validateForStats = (results) =>
  Promise.all(
    results.map((link) =>
      fetch(link.href)
        .then((response) => {
          const linkInfo = {
            link: link.href,
            statusText: response.statusText,
            status: response.status
          };
          return linkInfo;
        })
        .catch((error) => {
          const linkInfo = {
            status: error.code,
            statusText: error.message,
          };
          return linkInfo;
        })
  ));

function stats(arrayOfLinks) { 
  const total = arrayOfLinks.length;
  let broken = 0;

  arrayOfLinks.forEach((link) => {
    if (link.status !== 200) {
      broken++;
    }
  });

  return { total, broken };
};

export { stats, validateForStats };
