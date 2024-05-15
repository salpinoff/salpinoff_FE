import type { DesignTokens } from 'style-dictionary';
import type { ThemeConfig } from 'tailwindcss/types/config';

import { color as color_tokens } from '../color/base.json';
import { borderRadius as radius_tokens } from '../radius.json';
import { shadow as shadow_tokens } from '../shadow.json';
import { spacing as spacing_tokens } from '../spacing.json';

/**
 * Migrate from token based on 'style-dictionary' to object
 */
const parseToken = <T extends keyof ThemeConfig>(
  tokens: DesignTokens,
): ThemeConfig[T] =>
  Object.entries(tokens).reduce(
    (acc, [k, v]) => ({
      ...acc,
      [k]: Object.hasOwn(v, 'value') ? v.value : parseToken(v),
    }),
    {},
  );

const colors = parseToken<'colors'>(color_tokens.base);
const spacing = parseToken<'spacing'>(spacing_tokens);
const boxShadow = parseToken<'boxShadow'>(shadow_tokens);
const borderRadius = parseToken<'borderRadius'>(radius_tokens);

export { colors, spacing, boxShadow, borderRadius };
