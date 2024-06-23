import { Monster } from '@api/schema/monster';

export interface UpdateInteractionCountRequest
  extends Pick<Monster, 'monsterId' | 'interactionCount'> {}

export interface UpdateInteractionCountResponse
  extends Pick<Monster, 'monsterId'> {
  currentInteractionCount: string;
}
