import type { DesignTokens } from 'style-dictionary';
import type { ThemeConfig, PluginAPI } from 'tailwindcss/types/config';

import { color as color_tokens } from '../color/base.json';
import { borderRadius as radius_tokens } from '../radius.json';
import { shadow as shadow_tokens } from '../shadow.json';
import { spacing as spacing_tokens } from '../spacing.json';
import { typography as typography_tokens } from '../typography.json';

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

/**
 * Migrate from token based on 'style-dictionary' to CSS rule object
 * [tailwindcss/plugin](https://tailwindcss.com/docs/plugins#adding-components)
 */
const parseTypographyToken = (
  tokens: DesignTokens,
  prefix?: string,
): Parameters<PluginAPI['addComponents']>[0] =>
  Object.entries(tokens).reduce(
    (acc, [k, v]) => ({
      ...acc,
      ...(Object.hasOwn(v, 'value')
        ? { [`.${[prefix, k].join('-')}`]: v.value }
        : parseTypographyToken(v, k)),
    }),
    {},
  );

/**
 * [TO-BE] Tailwindcss theme propeties
 */
const colors = parseToken<'colors'>(color_tokens.base);
const spacing = parseToken<'spacing'>(spacing_tokens);
const boxShadow = parseToken<'boxShadow'>(shadow_tokens);
const borderRadius = parseToken<'borderRadius'>(radius_tokens);

/**
 * [TO-BE] Typography helper classes
 */
const typography = parseTypographyToken(typography_tokens);

export { colors, spacing, boxShadow, borderRadius, typography };
