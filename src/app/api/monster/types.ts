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
  ownerName: string;
  interactionCountPerEncouragement: number;
}

/** GetMonsterRef */
export interface GetMonsterRefResponse extends Monster {}

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
export interface ModifyMonsterRequest
  extends Pick<Monster, 'monsterId' | 'content'> {}

/** UpdateInteractionCount */
export interface UpdateInteractionCountRequest
  extends Pick<Monster, 'monsterId' | 'interactionCount'> {}

export interface UpdateInteractionCountResponse
  extends Pick<Monster, 'monsterId' | 'interactionCount'> {}
