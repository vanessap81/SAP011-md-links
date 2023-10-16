import { jest } from '@jest/globals';
// import { mdLinks } from '../src/md-links.js';
import validateLinks from '../src/validate.js';


const arrayDeLinks = [
  {
    title: 'Arranjos',
    href: 'https://curriculum.laboratoria.la/pt/topics/javascript/04-arrays',
    file: './src/links.md'
  },
];

describe('validateLinks', () => {
  it('deve retornar uma Promise', () => {
    const runValidate = validateLinks(arrayDeLinks);
    expect(runValidate instanceof Promise).toBe(true);
  });
});

describe('validateLinks', () => {
  it('deve trazer status code e status text do link', () => {
    const fetch = jest.spyOn(global, 'fetch').mockImplementation();
    const mock1 = {
      status: 200,
      statusText: 'OK',
    };
    fetch.mockResolvedValueOnce(mock1);
    const resultado = [{
      title: 'Arranjos',
      href: 'https://curriculum.laboratoria.la/pt/topics/javascript/04-arrays',
      file: './src/links.md',
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
