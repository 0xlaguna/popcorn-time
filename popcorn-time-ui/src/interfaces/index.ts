export interface IGetInfinitePages<T> {
  next?: string;
  previous?: string;
  results: T;
  count: number;
}
