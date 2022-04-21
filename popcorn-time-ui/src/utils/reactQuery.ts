import { api } from '../lib/api';

import { isNil } from 'ramda';

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query';

import { QueryFunctionContext } from 'react-query/types/core/types';
import { AxiosError, AxiosResponse } from 'axios';
import { IGetInfinitePages } from '../interfaces';

type QueryKeyT = [string, object | undefined];

export const fetcher = <T>({
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKeyT>): Promise<T> => {
  const [url, params] = queryKey;
  return api.get<T>(url, { params: { ...params, page: pageParam } }).then((res) => res.data);
};

const getPageParam = (url: string | undefined) => {
  const targetString = 'page=';

  if (isNil(url)) return false;

  const pIndex = url.indexOf(targetString);
  const pageNumber = url.substring(pIndex + targetString.length, url.length);

  return Number(pageNumber);
};

/**
 *
 * @param url the url to make the request
 * @param params an object with parameters
 * @returns
 */
export const useLoadMore = <T>(url: string | null, params?: object) => {
  const context = useInfiniteQuery<IGetInfinitePages<T>, Error, IGetInfinitePages<T>, QueryKeyT>(
    [url!, params],
    ({ queryKey, pageParam = 1 }) => fetcher({ queryKey, pageParam, meta: {} }),
    {
      getPreviousPageParam: (firstPage) => getPageParam(firstPage.previous),
      getNextPageParam: (lastPage) => getPageParam(lastPage.next),
    }
  );

  return context;
};

export const usePrefetch = <T>(url: string | null, params?: object) => {
  const queryClient = useQueryClient();

  return () => {
    if (!url) {
      return;
    }

    queryClient.prefetchQuery<T, Error, T, QueryKeyT>([url!, params], ({ queryKey }) =>
      fetcher({ queryKey, meta: {} })
    );
  };
};

export const useFetch = <T>(
  url: string | null,
  params?: object,
  config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {
  const context = useQuery<T, Error, T, QueryKeyT>(
    [url!, params],
    ({ queryKey }) => fetcher({ queryKey, meta: {} }),
    {
      enabled: !!url,
      ...config,
    }
  );

  return context;
};

/**
 *
 * @param func the function (which its exactly an axios promise)
 * @param url the url to make the request
 * @param params an object with parameters
 * @param updater
 * @returns
 */
const useGenericMutation = <T, S>(
  func: (data: T | S) => Promise<AxiosResponse<S>>,
  url: string,
  params?: object,
  updater?: ((oldData: T, newData: S) => T) | undefined
) => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, AxiosError, T | S>(func, {
    onMutate: async (data) => {
      await queryClient.cancelQueries([url!, params]);

      const previousData = queryClient.getQueryData([url!, params]);

      queryClient.setQueryData<T>([url!, params], (oldData) => {
        return updater ? updater(oldData!, data as S) : (data as T);
      });

      return previousData;
    },
    onError: (err, _, context) => {
      queryClient.setQueryData([url!, params], context);
    },
    onSettled: () => {
      queryClient.invalidateQueries([url!, params]);
    },
  });
};

export const useDelete = <T>(
  url: string,
  params?: object,
  updater?: (oldData: T, id: string | number) => T
) => {
  return useGenericMutation<T, string | number>(
    (id) => api.delete(`${url}/${id}`),
    url,
    params,
    updater
  );
};

export const usePost = <T, S>(
  url: string,
  params?: object,
  updater?: (oldData: T, newData: S) => T
) => {
  return useGenericMutation<T, S>((data) => api.post<S>(url, data), url, params, updater);
};

export const useUpdate = <T, S>(
  url: string,
  params?: object,
  updater?: (oldData: T, newData: S) => T
) => {
  return useGenericMutation<T, S>((data) => api.patch<S>(url, data), url, params, updater);
};
