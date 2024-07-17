type Title = Record<'emotion' | 'stress' | 'story', string | string[]>;

export const funnel = [
  'emotion',
  'stress',
  'story',
  'monstername',
  'monsterstyle',
] as const;

export const title: Title = {
  emotion: ['회사일로 스트레스 받을때', '나의 감정은 어땠나요?'],
  stress: ['현재 회사 일로 인해', '얼마나 스트레스를 받고 있나요?'],
  story: ['어떤 일로 스트레스를', '받았는지 친구들에게 알려주세요'],
};
