const MONSTER_KEYS = {
  all: ['monster'] as const,
  details: () => [...MONSTER_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...MONSTER_KEYS.details(), id] as const,
} as const;

export default MONSTER_KEYS;
