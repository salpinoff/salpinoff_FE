import { Decoration, Monster } from '@api/schema/monster';

export interface MonsterResponse extends Omit<Monster, 'rating'> {
  ratingRange: string;
  createdAt: string;
  interactionCountPerEncouragement: number;
}

/** CreateMonster */
export interface CreateMonsterRequest
  extends Omit<
    Monster,
    | 'monsterId'
    | 'interactionCount'
    | 'currentInteractionCount'
    | 'monsterDecorations'
  > {
  monsterDecorations: Omit<Decoration, 'decorationId'>[];
}

export interface CreateMonsterResponse extends MonsterResponse {
  ownerName: string;
}

/** GetMonster */
export interface GetMonsterResponse extends MonsterResponse {
  ownerName: string;
}

/** GetMonsterRef */
export interface GetMonsterRefResponse extends GetMonsterResponse {}

/** GetMonstersList */
export interface GetMonstersListRequest {
  page: number;
  size: number;
}

export interface GetMonsterListResponse {
  page: number;
  size: number;
  content: MonsterResponse[];
  totalElements: number;
}

/** ModifyMonster */
export interface ModifyMonsterRequest extends Pick<Monster, 'content'> {}
