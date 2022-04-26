import { useLoadMore, usePost } from '../utils/reactQuery';
import { apiRoutes } from './routes';

import { IWatch } from '../interfaces/watch';
import { getHeaders } from './routes/headers';

export const useGetWatchlist = () => useLoadMore<IWatch[]>(apiRoutes.getWatchlist, getHeaders());

export const useMutateWatchlist = () => usePost(apiRoutes.addWatchlist, getHeaders());
