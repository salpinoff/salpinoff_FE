export const EMOTION = {
  ANGER: 'ANGER',
  DEPRESSION: 'DEPRESSION',
} as const;

export const DECORATION_TYPE = {
  BACKGROUND_COLOR: 'BACKGROUND_COLOR',
  CAP: 'CAP',
  FACE: 'FACE',
  ACCESSORY: 'ACCESSORY',
} as const;

export interface Decoration {
  decorationId: number;
  decorationType: keyof typeof DECORATION_TYPE;
  decorationValue: string;
}

export interface Monster {
  rating: number;
  content: string;
  emotion: keyof typeof EMOTION;
  monsterId: string;
  monsterName: string;
  monsterDecorations: Decoration[];
  interactionCount: number;
  currentInteractionCount: number;
}
