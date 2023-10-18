import { jest } from '@jest/globals';
// import { mdLinks } from '../src/md-links.js';
import validateLinks from '../lib/validate.js';
import { statsAndValidate, statsFunction } from '../lib/stats.js';



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
});

describe('validateLinks', () => {
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

  // it('deve acusar erro com o catch', async () => {
  //   expect.assertions(1);
  //   const arrayDeLinks2 = [
  //     {
  //       title: 'Arranjos',
  //       href: ' ',
  //       file: './files/links.md'
  //     },
  //   ];

  //   const resultadoError = {
  //     error
  //   };

  //   return validateLinks(arrayDeLinks2).catch(e => {
  //     expect(e).toEqual(resultadoError);
  //   })
  // })
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