import { useFetch, useLoadMore } from '../utils/reactQuery';
import { apiRoutes } from './routes';

import { IMovies } from '../interfaces/movies';

export const useGetMovieList = () => useLoadMore<IMovies[]>(apiRoutes.getMovies);
