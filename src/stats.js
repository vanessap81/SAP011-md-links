const stats = (results) =>
  Promise.all(
    results.map((link) =>
      fetch(link.href)
        .then((response) => {
          // const hrefList = [];
          hrefList.push(response.statusText);

          if (response.statusText !== 'OK') {
            broken++;
          };

          const resultStats = {
            total: hrefList.length,
            broken: broken,
          };

          return resultStats;
        })
        .catch((error) => {
          const linkData = {
            status: error.code,
            statusText: error.message,
          };
          return linkData;
        })
  ));



export default stats;
