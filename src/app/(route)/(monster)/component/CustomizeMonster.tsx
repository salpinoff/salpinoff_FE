import Image from 'next/image';

import { useState, useEffect } from 'react';

import FormControlLabel from '@components/common/FormControlLabel';
import BaseText from '@components/common/Text/BaseText';
import CardBase from '@components/MonsterCard/CardBase';

import cn from '@utils/cn';

import { Decoration, DecorationType } from '@api/schema/monster';

import { ExtractProps } from '@type/util';

import CustomizeOption from './CustomizeOption';
import useSignUpContext from '../../(auth)/signup/hooks/useSignUpContext';
import useUserInfoContext from '../../(auth)/signup/hooks/useUserInfoContext';
import useUserInfoDispatchContext from '../../(auth)/signup/hooks/useUserInfoDispatchContext';

type CustomFilterprops = {
  id: DecorationType;
  label: string;
  active: boolean;
};

type Colors = NonNullable<ExtractProps<typeof CardBase>['color']>;

const CUSTOM_FILTER: CustomFilterprops[] = [
  {
    id: DecorationType.BACKGROUND_COLOR,
    label: '배경색',
    active: true,
  },
  {
    id: DecorationType.ACCESORY,
    label: '악세사리',
    active: false,
  },
  {
    id: DecorationType.STICKER,
    label: '스티커',
    active: false,
  },
  {
    id: DecorationType.SPEECH_BUBBLE,
    label: '말풍선',
    active: false,
  },
];

const DecorationValueTable = {
  [DecorationType.BACKGROUND_COLOR]: [
    'RED_ORANGE',
    'GREEN',
    'CYAN',
    'LIGHT_BLUE',
    'VIOLET',
  ],
  [DecorationType.ACCESORY]: [],
  [DecorationType.STICKER]: [],
  [DecorationType.SPEECH_BUBBLE]: [],
};

function CustomizeMonster() {
  const { setBtnDisabled } = useSignUpContext();
  const { monster } = useUserInfoContext();
  const { update } = useUserInfoDispatchContext();

  const [type, setType] = useState<keyof typeof DecorationType>(
    DecorationType.BACKGROUND_COLOR,
  );

  const [decorations, setDecorations] = useState<
    Partial<Record<keyof typeof DecorationType, string>>
  >({});

  const handleFilterChange = (e: React.SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;

    setType(value as DecorationType);
  };

  const handleDecoChange = (e: React.SyntheticEvent) => {
    const { id } = e.target as HTMLInputElement;

    if (type && id) {
      setDecorations({
        ...decorations,
        [type]: id,
      });
    }
  };

  useEffect(() => {
    const { name } = monster;
    const decorationArray = decorations
      ? Object.entries(decorations).map(
          ([k, v]) =>
            ({
              decorationType: k,
              decorationValue: v,
            }) as Omit<Decoration, 'decorationId'>,
        )
      : [];

    update({
      monster: {
        name,
        decorations: decorationArray,
      },
    });
  }, [decorations]);

  useEffect(() => {
    // 커스텀 => optional?
    setBtnDisabled(!(decorations ?? [].length));
  });

  return (
    <section className="text-center">
      <BaseText
        component="h3"
        variant="headline-1"
        weight="semibold"
        color="normal"
        className="mb-[37px]"
      >
        이제 퇴사몬을 꾸며주세요!
      </BaseText>
      <CardBase
        color={
          decorations &&
          (decorations[DecorationType.BACKGROUND_COLOR] as Colors)
        }
        className="mx-auto mb-[32px] flex h-[260px] w-[260px] items-center justify-center border-none shadow-5 !outline-none"
      >
        {/* 🚧 예시 - 이후 개선 필요 */}
        <Image
          src="/sample.png"
          width={246}
          height={184}
          alt="Sample Monster"
        />
      </CardBase>
      <div
        className={cn('mb-20 flex gap-12 overflow-x-auto', 'scrollbar-hide')}
      >
        {CUSTOM_FILTER.map(({ id, label, active }) => (
          <FormControlLabel
            key={id}
            id={id}
            className="label-1-semibold relative w-max rounded-full bg-[#70737C38] px-16 py-8 text-cool-neutral-90A has-[:checked]:!bg-common-100 has-[:checked]:!text-cool-neutral-10 has-[:disabled]:!text-cool-neutral-70A"
            name="decorationType"
            label={label}
            value={id}
            checked={type === id}
            control={<input type="radio" className="a11yHidden" />}
            disabled={!active}
            {...(active ? { onChange: handleFilterChange } : {})}
          />
        ))}
      </div>
      <div className={cn('flex gap-[16px] overflow-x-auto', 'scrollbar-hide')}>
        {DecorationValueTable[type].map((id) => (
          <CustomizeOption
            key={id}
            id={id}
            name={type}
            checked={decorations[type] === id}
            onChange={handleDecoChange}
          />
        ))}
      </div>
    </section>
  );
}

export default CustomizeMonster;