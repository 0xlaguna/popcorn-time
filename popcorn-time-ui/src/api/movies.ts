import { useFetch, useLoadMore } from '../utils/reactQuery';
import { apiRoutes } from './routes';

import { IMovie } from '../interfaces/movies';

// utils
import { pathToUrl } from '../utils/router';

export const useGetMovieList = () => useLoadMore<IMovie[]>(apiRoutes.getMovies);

export const useGetMovieDetail = (id: number | null) =>
  useFetch<IMovie>(id ? pathToUrl(apiRoutes.getMovieDetail, { id }) : null);
