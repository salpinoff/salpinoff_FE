import _ from 'lodash';

export const findObjectInArray = _.curry(
  <T extends Record<string, unknown>>(
    array: T[],
    key: keyof T,
    value: T[keyof T],
  ) => array.find((obj) => obj[key] === value),
);
