import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import _ from 'lodash';

import FormControlLabel from '@components/common/FormControlLabel';
import BaseText from '@components/common/Text/BaseText';
import CardBase from '@components/MonsterCard/CardBase';

import useWithAuth from '@hooks/useWithAuth';

import cn from '@utils/cn';
import { findObjectInArray } from '@utils/find';

import MONSTER_APIS from '@api/monster';
import { DecorationType } from '@api/schema/monster';

import { ExtractProps } from '@type/util';

import CustomizeOption from './CustomizeOption';
import useSignUpContext from '../../(auth)/signup/hooks/useSignUpContext';
import useUserInfoContext from '../../(auth)/signup/hooks/useUserInfoContext';
import useUserInfoDispatchContext from '../../(auth)/signup/hooks/useUserInfoDispatchContext';

type CustomFilterProps = {
  id: DecorationType;
  label: string;
  active: boolean;
};

type Colors = NonNullable<ExtractProps<typeof CardBase>['color']>;

const CUSTOM_FILTER: CustomFilterProps[] = [
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

type DecorationTypes = keyof typeof DecorationType;

function CustomizeMonster() {
  const { replace } = useRouter();

  const withAuth = useWithAuth();

  const { setBtnDisabled, registerCallback } = useSignUpContext();
  const { update } = useUserInfoDispatchContext();
  const { stress, story, emotion, monsterName, decorations } =
    useUserInfoContext();

  const { mutate: create } = useMutation({
    mutationKey: ['creatMonster'],
    mutationFn: MONSTER_APIS.createMonster,
    onMutate: () => withAuth(() => {}),
    onSuccess: (data) => replace(`/result?monsterId=${data.data.monsterId}`),
    onError(error) {
      // [TODO]: toast
      console.log('error :: 몬스터 생성에 실패했어요.', error);
      replace('/');
    },
  });

  const [type, setType] = useState<DecorationTypes>(
    DecorationType.BACKGROUND_COLOR,
  );

  const findDecoration = findObjectInArray(decorations, 'decorationType');

  const updateDecoration = (
    decorationType: DecorationTypes,
    decorationValue: string,
  ) =>
    _.unionBy(
      [
        {
          decorationType,
          decorationValue,
        },
      ],
      decorations,
      'decorationType',
    );

  const handleFilterChange = (e: React.SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;

    setType(value as DecorationType);
  };

  const handleDecoChange = (e: React.SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;

    if (type && value) {
      const updated = updateDecoration(type, value);

      update({
        decorations: updated,
      });
    }
  };

  const handleClick = () => {
    return create({
      rating: stress,
      content: story,
      emotion: emotion !== '' ? emotion : 'DEPRESSION',
      monsterName,
      monsterDecorations: decorations,
    });
  };

  useEffect(() => {
    setBtnDisabled(false);
    registerCallback(handleClick);
  }, [decorations]);

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
        color={findDecoration(type)?.decorationValue as Colors}
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
            checked={findDecoration(type)?.decorationValue === id}
            onChange={handleDecoChange}
          />
        ))}
      </div>
    </section>
  );
}

export default CustomizeMonster;
