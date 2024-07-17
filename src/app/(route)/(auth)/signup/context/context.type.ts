import { Member, MemberStatusCodes } from '@api/schema/member';

import { MonsterInfo } from 'src/app/(route)/(monster)/monster/produce/context/context.type';

export interface UserInfo extends MonsterInfo {
  // Member Info
  code: MemberStatusCodes;
  userName: Member['username'];
}
