import { ReactNode } from 'react';

export type ExtractProps<T> = T extends (props: infer P) => ReactNode
  ? P
  : never;
