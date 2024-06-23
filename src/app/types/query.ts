import { QueryOptions as TanstackOptions } from '@tanstack/react-query';

export interface QueryOptions
  extends Required<Pick<TanstackOptions, 'queryKey' | 'queryFn'>> {
  isInfiniteQuery?: boolean;
}
