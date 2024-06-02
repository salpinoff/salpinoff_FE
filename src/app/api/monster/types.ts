import { Monster } from '@api/schema/monster';

/** CreateMonster */
export interface CreateMonsterRequest extends Monster {}

/** GetMonster */
export interface GetMonsterResponse extends Monster {}

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
