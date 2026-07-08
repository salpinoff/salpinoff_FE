import type { MessageListResponse } from '@api/message/type';
import type {
  CreateMonsterResponse,
  MonsterResponse,
} from '@api/monster/types';
import { DECORATION_TYPE, EMOTION } from '@api/schema/monster';
import type { Session } from '@api/schema/token';

// Canned demo data. Reads only — writes echo back through the adapter and are not
// persisted (see docs/adr/0001-mock-demo-mode.md).

export const DEMO_USER = { memberId: 1, username: '데모몬' };

export const DEMO_SESSION: Session = {
  accessToken: 'demo-access-token',
  status: 'authenticated',
  userInfo: { memberId: DEMO_USER.memberId, username: DEMO_USER.username },
};

const deco = (
  decorationId: number,
  decorationType: keyof typeof DECORATION_TYPE,
  decorationValue: string,
) => ({ decorationId, decorationType, decorationValue });

export const DEMO_MONSTERS: CreateMonsterResponse[] = [
  {
    monsterId: '1',
    monsterName: '부글이',
    emotion: EMOTION.ANGER,
    content:
      '오늘 회의에서 준비한 걸 다 못 보여줘서 분했어. 그래도 다음엔 잘할 거야!',
    rating: 3,
    ratingRange: '20~40',
    interactionCount: 10,
    currentInteractionCount: 7,
    interactionCountPerEncouragement: 5,
    createdAt: '2024-05-01T09:00:00',
    ownerName: DEMO_USER.username,
    monsterDecorations: [
      deco(1, DECORATION_TYPE.BACKGROUND_COLOR, '#F450A6'),
      deco(2, DECORATION_TYPE.CAP, 'HEADSET'),
      deco(3, DECORATION_TYPE.ACCESSORY, 'COFFEE'),
    ],
  },
  {
    monsterId: '2',
    monsterName: '축축이',
    emotion: EMOTION.DEPRESSION,
    content: '요즘 뭘 해도 기운이 안 나. 잠깐 쉬어가도 괜찮겠지?',
    rating: 2,
    ratingRange: '0~20',
    interactionCount: 8,
    currentInteractionCount: 8,
    interactionCountPerEncouragement: 4,
    createdAt: '2024-05-03T18:30:00',
    ownerName: DEMO_USER.username,
    monsterDecorations: [
      deco(4, DECORATION_TYPE.BACKGROUND_COLOR, '#4485FD'),
      deco(5, DECORATION_TYPE.FACE, 'GLASSES'),
      deco(6, DECORATION_TYPE.ACCESSORY, 'LAPTOP'),
    ],
  },
];

export const findMonster = (monsterId?: string): MonsterResponse =>
  DEMO_MONSTERS.find((m) => m.monsterId === monsterId) ?? DEMO_MONSTERS[0];

export const DEMO_MESSAGES: MessageListResponse = {
  content: [
    {
      messageId: 1,
      sender: '친구 A',
      content: '오늘도 수고 많았어! 넌 충분히 잘하고 있어.',
      checked: false,
    },
    {
      messageId: 2,
      sender: '동료 B',
      content: '그 발표 진짜 멋졌어. 자신감 가져도 돼!',
      checked: false,
    },
    {
      messageId: 3,
      sender: '가족',
      content: '언제나 응원해. 오늘은 푹 쉬어.',
      checked: true,
    },
  ],
  size: 10,
  page: 0,
  totalElements: 3,
  checkedMessageCount: 1,
  uncheckedMessageCount: 2,
};
