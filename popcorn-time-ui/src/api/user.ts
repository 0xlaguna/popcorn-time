import { usePost } from '../utils/reactQuery';
import { apiRoutes } from './routes';

export const useMutateToken = () => usePost(apiRoutes.token);
