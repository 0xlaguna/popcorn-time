import { compile } from 'path-to-regexp';

const compilePath =
  (path: string) =>
  (options: object = {}) => {
    if (path.startsWith('https://') || path.startsWith('http://')) {
      const { origin, pathname } = new URL(path);
      const buildURL = compile(pathname);
      const url = `${origin}${buildURL(options)}`;

      return url;
    }

    const buildURL = compile(path);
    const url = buildURL(options);

    return url;
  };

export const pathToUrl = (path: string, params: object = {}) => compilePath(path)(params);
