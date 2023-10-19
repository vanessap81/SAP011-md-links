import { jest } from '@jest/globals';
import validateLinks from '../lib/validate.js';
import { statsAndValidate, statsFunction } from '../lib/stats.js';
import { mdLinks } from '../lib/md-links.js';
// import { readFile } from 'fs/promises';

const arrayDeLinks = [
  {
    title: 'Arranjos',
    href: 'https://curriculum.laboratoria.la/pt/topics/javascript/04-arrays',
    file: './files/links.md'
  },
];

describe('validateLinks', () => {
  it('deve retornar uma Promise', () => {
    const runValidate = validateLinks(arrayDeLinks);
    expect(runValidate instanceof Promise).toBe(true);
  });
  it('deve trazer status code e status text do link', async () => {
    const fetch = jest.spyOn(global, 'fetch').mockImplementation();
    const property = {
      status: 200,
      statusText: 'OK',
    };
    fetch.mockResolvedValueOnce(property);
    const resultado = [{
      title: 'Arranjos',
      href: 'https://curriculum.laboratoria.la/pt/topics/javascript/04-arrays',
      file: './files/links.md',
      status: 200,
      statusText: 'OK',
    }];
    return validateLinks(arrayDeLinks).then(result => {
      expect(result).toEqual(resultado);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(arrayDeLinks[0].href);
    });
  }
  );
});

describe('statsAndValidate', () => {
  it('deve trazer um objeto com propriedades de total de links, links únicos e links quebrados', () => {
    const arrayDadosDosLinks = [
      {
        title: 'Arranjos',
        href: 'https://curriculum.laboratoria.la/pt/topics/javascript/04-arrays',
        file: './files/links.md',
        status: 200,
        statusText: 'OK',
      },
      {
        title: 'Github Vanessa',
        href: 'https://github.com/vanessap91',
        file: './files/links.md',
        status: 404,
        statusText: 'Not Found',
      }
    ];

    const resultadoStats = {
      total: 2,
      unique: 2,
      broken: 1,
    };

    const stats = statsAndValidate(arrayDadosDosLinks);
    expect(stats).toEqual(resultadoStats);
  });
});

describe('statsFunction', () => {
  it('deve trazer um objeto com propriedades de total de links e links únicos', () => {
    const arrayDadosDosLinks2 = [
      {
        title: 'Arranjos',
        href: 'https://curriculum.laboratoria.la/pt/topics/javascript/04-arrays',
        file: './files/links.md',
        status: 200,
        statusText: 'OK',
      },
      {
        title: 'Github Vanessa',
        href: 'https://github.com/vanessap91',
        file: './files/links.md',
        status: 404,
        statusText: 'Not Found',
      }
    ];

    const resultadoStats2 = {
      total: 2,
      unique: 2,
    };

    const stats = statsFunction(arrayDadosDosLinks2);
    expect(stats).toEqual(resultadoStats2);
  });
});

describe('md-links', () => {
  it('deve retornar uma Promise', () => {
    const runMdLinks = mdLinks('./files/links.md');
    expect(runMdLinks instanceof Promise).toBe(true);
  });
  it('deve resolver uma Promisse entregando um array de objetos texto, href e file', async () => {
    const resultadoMdLinks = [
      {
        title: 'Github Broken',
        href: 'https://github.com/vanessap91',
        file: './files/linksTest.md',
      },
      {
        title: 'Github Vanessa',
        href: 'https://github.com/vanessap81',
        file: './files/linksTest.md',
      },
      {
        title: 'Youtube',
        href: 'https://youtube.com',
        file: './files/linksTest.md',
      }
    ];
    mdLinks('./files/linksTest.md').then((result) => {
      expect(result).toEqual(resultadoMdLinks);
    })
  });
});

// describe('readFile', () => {
//   it('deve retornar uma Promise', () => {
//     const runReadFile = readFile('./files/links.md');
//     expect(runReadFile instanceof Promise).toBe(true);
//   });
//   it('deve disparar um erro caso o arquivo não seja .md', () => {
//     expect(readFile('./files/links.txt')).rejects.toEqual(err.message);
//   })
// });

// describe('md-links', () => {
//   it('deve resolver uma Promisse entregando um array de objetos com links validados', async () => {
//     const resultadoMdLinks2 = [
//       {
//         title: 'Github Broken',
//         href: 'https://github.com/vanessap91',
//         file: './files/linksTest.md',
//         status: 404,
//         statusText: 'Not Found',
//       },
//       {
//         title: 'Github Vanessa',
//         href: 'https://github.com/vanessap81',
//         file: './files/linksTest.md',
//         status: 200,
//         statusText: 'OK',
//       },
//       {
//         title: 'Youtube',
//         href: 'https://youtube.com',
//         file: './files/linksTest.md',
//         status: 200,
//         statusText: 'OK',
//       }
//     ];

//     mdLinks('./files/linksTest.md', '--validate').then((result) => {
//       expect(result).toEqual(resultadoMdLinks2);
//     })
//   });
// });
