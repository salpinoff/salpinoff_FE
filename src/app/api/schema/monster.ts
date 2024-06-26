import tokens from 'tokens/color/base.json';

export const enum Emotion {
  ANGER = 'ANGER',
  DEPRESSION = 'DEPRESSION',
}

export const DecorationType = {
  BACKGROUND_COLOR: 'BACKGROUND_COLOR',
  CAP: 'CAP',
  FACE: 'FACE',
  ACCESSORY: 'ACCESSORY',
} as const;

export const DecorationValue = {
  [DecorationType.BACKGROUND_COLOR]: [
    tokens.color.base['red-orange'][70].value,
    tokens.color.base.green[70].value,
    tokens.color.base.cyan[70].value,
    tokens.color.base['light-blue'][70].value,
    tokens.color.base.violet[70].value,
  ],
  [DecorationType.CAP]: ['HEADSET'],
  [DecorationType.FACE]: ['GLASSES'],
  [DecorationType.ACCESSORY]: ['COFFEE', 'LAPTOP', 'PAPER'],
} as const;

export type DecorationTypes = keyof typeof DecorationType;
export type DecorationValues =
  (typeof DecorationValue)[DecorationTypes][number];

export interface Decoration {
  decorationId: number;
  decorationType: keyof typeof DecorationType;
  decorationValue: string;
}

export interface Monster {
  rating: number;
  content: string;
  emotion: keyof typeof Emotion;
  monsterId: string;
  monsterName: string;
  monsterDecorations: Decoration[];
  interactionCount: number;
  currentInteractionCount: number;
}
