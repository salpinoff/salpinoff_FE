import { Decoration, Monster } from '@api/schema/monster';

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

export interface CreateMonsterResponse extends Omit<Monster, 'rating'> {
  ownerName: string;
  interactionCountPerEncouragement: number;
}

/** GetMonster */
export interface GetMonsterResponse extends Omit<Monster, 'rating'> {
  ratingRange: string;
  ownerName: string;
  interactionCountPerEncouragement: number;
  createdAt: string;
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
  content: Omit<Monster, 'rating'>[];
  totalElements: number;
}

/** ModifyMonster */
export interface ModifyMonsterRequest extends Pick<Monster, 'content'> {}
