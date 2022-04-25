import { useFetch, useLoadMore, usePost } from '../utils/reactQuery';
import { apiRoutes } from './routes';

import { IMovie, IRating } from '../interfaces/movies';

// utils
import { pathToUrl } from '../utils/router';

export const useGetMovieList = () => useLoadMore<IMovie[]>(apiRoutes.getMovies);

export const useGetMovieDetail = (id: number | null) =>
  useFetch<IMovie>(id ? pathToUrl(apiRoutes.getMovieDetail, { id }) : null);

export const useGetMovieRatings = (params: object = {}) =>
  useLoadMore<IRating[]>(apiRoutes.getMovieRatings, params);

export const useMutateMovie = () => usePost(apiRoutes.addMovie);
