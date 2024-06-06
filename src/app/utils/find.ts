import { curry } from 'lodash';

export const findObjectInArray = curry(
  <T extends Record<string, unknown>>(
    array: T[],
    key: keyof T,
    value: T[keyof T],
  ) => array.find((obj) => obj[key] === value),
);
