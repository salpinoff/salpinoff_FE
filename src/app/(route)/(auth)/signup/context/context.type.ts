import { Member, MemberStatusCodes } from '@api/schema/member';
import { Decoration, Monster } from '@api/schema/monster';

export type UserInfo = {
  // Member Info
  code: MemberStatusCodes;
  userName: Member['username'];
  // Monster Info
  emotion: Monster['emotion'] | '';
  stress: Monster['rating'];
  story: Monster['content'];
  monsterName: Monster['monsterName'];
  decorations: Omit<Decoration, 'decorationId'>[];
};
