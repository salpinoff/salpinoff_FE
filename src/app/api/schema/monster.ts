export const enum Emotion {
  ANGER = 'ANGER',
  DEPRESSION = 'DEPRESSION',
}

export const enum DecorationType {
  BACKGROUND_COLOR = 'BACKGROUND_COLOR',
  ACCESORY = 'ACCESORY',
  STICKER = 'STICKER',
  SPEECH_BUBBLE = 'SPEECH_BUBBLE',
}

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
