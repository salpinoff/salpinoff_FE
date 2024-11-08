import { Decoration, Monster } from '@api/schema/monster';

export type MonsterInfo = {
  emotion: Monster['emotion'] | '';
  stress: Monster['rating'];
  story: Monster['content'];
  monsterName: Monster['monsterName'];
  decorations: Omit<Decoration, 'decorationId'>[];
};
