import { validationPatterns } from './validationPatterns';

type ValidationType = keyof typeof validationPatterns;

const rootValidate = (type: ValidationType, value: string): boolean => {
  if (!(type in validationPatterns)) {
    throw new Error('Invalid validation type');
  }
  return validationPatterns[type].test(value);
};

export const validate = {
  monsterId: (value: string): boolean => rootValidate('monsterId', value),
  name: (value: string): boolean => rootValidate('name', value),
  encourageMessage: (value: string): boolean =>
    rootValidate('encourageMessage', value),
};
