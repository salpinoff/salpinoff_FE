import type { DesignTokens } from 'style-dictionary';
import type { ThemeConfig } from 'tailwindcss/types/config';

import { color } from '../color/base.json';

/**
 * Migrate from token based on 'style-dictionary' to object
 */
const parseBaseColorToken = (tokens: DesignTokens): ThemeConfig['colors'] =>
  Object.entries(tokens).reduce(
    (acc, [k, v]) => ({
      ...acc,
      [k]: Object.hasOwn(v, 'value') ? v.value : parseBaseColorToken(v),
    }),
    {},
  );

const colors = parseBaseColorToken(color.base);

export { colors };
