export type RequiredByKeys<T, K extends keyof T = keyof T> = Omit<
  T & Required<Pick<T, K & keyof T>>,
  never
>;

export type ExtractProps<T> = T extends (props: infer P) => React.ReactNode
  ? P
  : never;

export type PropsOfFn<T> = T extends (props: infer P) => void ? P : never;
