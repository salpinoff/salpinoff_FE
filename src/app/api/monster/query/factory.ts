import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';

import { getRefMonster, getMonsterById, getMonsterList } from '..';

const MonsterQueryFactory = createQueryKeys('monster', {
  reference: {
    queryKey: null, // output: ['monster', 'reference']
    queryFn: getRefMonster,
  },
  list: {
    queryKey: null,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getMonsterList({ page: pageParam as number, size: 10 });
      return res.data;
    },
  },
  detail: (id: string) => ({
    queryKey: [id], // output: ['monster', 'detail', id]
    queryFn: () => getMonsterById(id),
  }),
});

export type MonsterKeys = inferQueryKeys<typeof MonsterQueryFactory>;

export default MonsterQueryFactory;
