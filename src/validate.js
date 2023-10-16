const validateLinks = (results) => 
  Promise.all(
    results.map((link) =>
      fetch(link.href)
        .then((response) => {
          const linkData = {
            title: link.title,
            href: link.href,
            file: link.file,
            status: response.status,
            statusText: response.statusText,
          };
          return linkData;
        })
        .catch((error) => {
          const linkData = {
            status: error.code,
            statusText: error.message,
          };
          return linkData;
        })
    )
  );

export default validateLinks;
