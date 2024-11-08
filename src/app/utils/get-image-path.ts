import { hasIn, get } from 'lodash';

const version = '0000' as const;

const itemTypes = {
  coffee: 'coffee',
  glasses: 'glasses',
  headset: 'headset',
  laptop: 'laptop',
  paper: 'paper',
} as const;

const monsterTypes = {
  mad_before: 'mad_before',
  mad_after: 'mad_after',
  sad_before: 'sad_before',
  sad_after: 'sad_after',
} as const;

const dirPath = {
  base: ['/images'] as const,
  items: () => [...dirPath.base, 'items'] as const,
  preview: () => [...dirPath.items(), 'preview'] as const, // Tab 아이템 프리뷰
  monsters: () => [...dirPath.base, 'monsters'] as const,
};

const imagePath = {
  items: {
    coffee: () =>
      `${dirPath.items().join('/')}/${itemTypes.coffee}${version}.png`,
    glasses: () =>
      `${dirPath.items().join('/')}/${itemTypes.glasses}${version}.png`,
    headset: () =>
      `${dirPath.items().join('/')}/${itemTypes.headset}${version}.png`,
    laptop: () =>
      `${dirPath.items().join('/')}/${itemTypes.laptop}${version}.png`,
    paper: () =>
      `${dirPath.items().join('/')}/${itemTypes.paper}${version}.png`,
  },
  preview: {
    coffee: () =>
      `${dirPath.preview().join('/')}/${itemTypes.coffee}${version}.png`,
    glasses: () =>
      `${dirPath.preview().join('/')}/${itemTypes.glasses}${version}.png`,
    headset: () =>
      `${dirPath.preview().join('/')}/${itemTypes.headset}${version}.png`,
    laptop: () =>
      `${dirPath.preview().join('/')}/${itemTypes.laptop}${version}.png`,
    paper: () =>
      `${dirPath.preview().join('/')}/${itemTypes.paper}${version}.png`,
  },
  monsters: {
    mad_before: () =>
      `${dirPath.monsters().join('/')}/${monsterTypes.mad_before}${version}.png`,
    mad_after: () =>
      `${dirPath.monsters().join('/')}/${monsterTypes.mad_after}${version}.png`,
    sad_before: () =>
      `${dirPath.monsters().join('/')}/${monsterTypes.sad_before}${version}.png`,
    sad_after: () =>
      `${dirPath.monsters().join('/')}/${monsterTypes.sad_after}${version}.png`,
  },
};

type DirPath = typeof dirPath;

function getImagePath(type: keyof Pick<DirPath, 'base'>): string;

function getImagePath(
  type: keyof Pick<DirPath, 'items'>,
  name: keyof typeof itemTypes | string,
): string;

function getImagePath(
  type: keyof Pick<DirPath, 'monsters'>,
  name: keyof typeof monsterTypes | string,
): string;

function getImagePath(type: keyof DirPath, name?: string): string {
  if (type !== 'base' && name) {
    if (hasIn(imagePath, [type, name.toLowerCase()])) {
      return get(imagePath, [type, name.toLowerCase()])();
    }
    return '';
  }

  return `${dirPath.base.join('/')}`;
}

export default getImagePath;
