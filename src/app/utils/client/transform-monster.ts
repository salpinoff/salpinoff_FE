import { Decoration, EMOTION, Monster } from '@api/schema/monster';

export const getCharacterTypeByEmotion = (emotion: keyof typeof EMOTION) =>
  (
    ({
      [EMOTION.ANGER]: 'mad',
      [EMOTION.DEPRESSION]: 'sad',
      // ...
    }) as const
  )[emotion] ?? 'sad';

export const getCharacterStatus = (clear: boolean) =>
  clear ? ('after' as const) : ('before' as const);

export const getDecorationMap = <T extends readonly Decoration[]>(
  decorations: T,
): Partial<
  Record<T[number]['decorationType'], T[number]['decorationValue']>
> => {
  return decorations.reduce(
    (acc, item) => ({
      ...acc,
      // 현재 데코레이션 타입별 중복 선택 기능은 없음
      [item.decorationType]: item.decorationValue,
    }),
    {},
  );
};

// [TODO] 데코레이션 데이터 리턴 구조 픽스 이후 수정
const transformMonster = <
  T extends Pick<
    Monster,
    | 'emotion'
    | 'monsterDecorations'
    | 'interactionCount'
    | 'currentInteractionCount'
  >,
>(
  data: T,
) => {
  const clear = data.currentInteractionCount >= data.interactionCount;
  const type = getCharacterTypeByEmotion(data.emotion);
  const status = getCharacterStatus(clear);
  const decorations = getDecorationMap(data.monsterDecorations);

  return {
    ...data,
    type,
    status,
    clear,
    decorations,
  };
};

export default transformMonster;
