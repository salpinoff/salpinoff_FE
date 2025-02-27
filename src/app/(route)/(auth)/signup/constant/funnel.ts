type Title = Record<
  'nickname' | 'emotion' | 'stress' | 'story',
  string | string[]
>;

export const funnel = [
  'nickname',
  'emotion',
  'stress',
  'story',
  'monstername',
  'monsterstyle',
] as const;

export const title: Title = {
  nickname: ['나를 잘 표현하는', '닉네임을 적어주세요'],
  emotion: ['회사에서 스트레스를 받았을 때,', '어떤 감정이 들었나요?'],
  stress: ['현재 회사 일로 인해', '얼마나 스트레스를 받고 있나요?'],
  story: ['어떤 일로 스트레스를', '받았는지 친구들에게 알려주세요'],
};
