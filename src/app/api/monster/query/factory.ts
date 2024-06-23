import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';

import { getRefMonster, getMonsterById, getMonsterList } from '..';

const MonsterQueryFactory = createQueryKeys('monster', {
  reference: () => ({
    queryKey: ['reference'], // output: ['monster', 'reference']
    queryFn: getRefMonster,
  }),
  detail: (id: string) => ({
    queryKey: [id], // output: ['monster', id]
    queryFn: () => getMonsterById(id),
  }),
  list: (filters) => ({
    queryKey: [{ filters }], // output: ['monster', 'list', { filters }]
    queryFn: getMonsterList,
    contextQueries: {},
  }),
});

export type MonsterKeys = inferQueryKeys<typeof MonsterQueryFactory>;

export default MonsterQueryFactory;
