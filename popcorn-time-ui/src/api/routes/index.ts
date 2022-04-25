import { apiBaseUrl } from '../../lib/constants';

export const apiRoutes = {
  getMovies: `${apiBaseUrl}/api/movies`,
  getMovieDetail: `${apiBaseUrl}/api/movies/:id/`,
  getMovieRatings: `${apiBaseUrl}/api/ratings`,
};
