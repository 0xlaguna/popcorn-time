import { apiBaseUrl } from '../../lib/constants';

export const apiRoutes = {
  getMovies: `${apiBaseUrl}/api/movies`,
  getMovieDetail: `${apiBaseUrl}/api/movies/:id/`,
  getMovieRatings: `${apiBaseUrl}/api/ratings`,
  addMovie: `${apiBaseUrl}/api/addmovie`,
  token: `${apiBaseUrl}/api/token/`,
  getWatchlist: `${apiBaseUrl}/api/watchlist`,
  addWatchlist: `${apiBaseUrl}/api/watchlist/new`,
};
