import { useRouter } from 'next/navigation';

import React, { PropsWithChildren, useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { findIndex, xorBy, unionBy } from 'lodash';

import CharacterCanvas from '@components/CharacterCanvas';
import BaseText from '@components/common/Text/BaseText';

import useWithAuth from '@hooks/useWithAuth';

import { getCharacterTypeByEmotion } from '@utils/client/transform-monster';
import cn from '@utils/cn';
import { findObjectInArray } from '@utils/find';

import { createMonster } from '@api/monster';
import { DECORATION_TYPE, EMOTION } from '@api/schema/monster';

import CustomizeOption from './CustomizeOption';
import Tabs from './Tabs';
import useSignUpContext from '../../(auth)/signup/hooks/useSignUpContext';
import useUserInfoContext from '../../(auth)/signup/hooks/useUserInfoContext';
import useUserInfoDispatchContext from '../../(auth)/signup/hooks/useUserInfoDispatchContext';
import { DECORATION_PAIRS } from '../constants/decorations';

type DecorationTypes = keyof typeof DECORATION_TYPE;
type DecorationValues = (typeof DECORATION_PAIRS)[DecorationTypes][number];

type TabPanelProps = PropsWithChildren;

function TabPanel({ children }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      className={cn('flex gap-[16px] overflow-x-auto', 'scrollbar-hide')}
    >
      {children}
    </div>
  );
}

function CustomizeMonster() {
  const { replace } = useRouter();

  const withAuth = useWithAuth();

  const { setBtnDisabled, registerCallback } = useSignUpContext();
  const { update } = useUserInfoDispatchContext();
  const { stress, story, emotion, monsterName, decorations } =
    useUserInfoContext();

  const CHARACTER_TYPE = getCharacterTypeByEmotion(
    emotion as keyof typeof EMOTION,
  );

  const CHARACTER_ITEMS = decorations
    .map(
      (deco) =>
        deco.decorationType !== DECORATION_TYPE.BACKGROUND_COLOR &&
        deco.decorationValue.toLowerCase(),
    )
    .filter(Boolean) as string[];

  const { mutate: create } = useMutation({
    mutationKey: ['creatMonster'],
    mutationFn: createMonster,
    onMutate: () => withAuth(() => {}),
    onSuccess: (data) => replace(`/monster/${data.data.monsterId}/result`),
    onError(error) {
      // [TODO]: toast
      console.log('error :: 몬스터 생성에 실패했어요.', error);
      replace('/');
    },
  });

  const [type, setType] = useState<DecorationTypes>(
    DECORATION_TYPE.BACKGROUND_COLOR,
  );

  const findDecoration = findObjectInArray(decorations, 'decorationType');

  const updateDecoration = (
    decorationType: DecorationTypes,
    decorationValue: DecorationValues,
  ) => {
    const newDecoration = {
      decorationType,
      decorationValue,
    };

    if (findIndex(decorations, newDecoration) === 0) {
      return xorBy([newDecoration], decorations, 'decorationType');
    }
    return unionBy([newDecoration], decorations, 'decorationType');
  };

  const handleFilterChange = (
    event: React.SyntheticEvent,
    value: DecorationTypes,
  ) => {
    setType(value);
  };

  const handleDecoChange = (e: React.SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;

    if (type && value) {
      const updated = updateDecoration(type, value as DecorationValues);

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
      <CharacterCanvas
        className="relative mx-auto mb-[32px] h-[260px] w-[260px] overflow-hidden rounded-[36px] shadow-5"
        width={520}
        height={520}
        background={
          findDecoration(DECORATION_TYPE.BACKGROUND_COLOR)?.decorationValue
        }
        type={CHARACTER_TYPE}
        items={CHARACTER_ITEMS}
      />
      <Tabs<DecorationTypes>
        className="mb-20 flex gap-12"
        value={type}
        onChange={handleFilterChange}
      >
        <Tabs.Tab label="배경" value={DECORATION_TYPE.BACKGROUND_COLOR} />
        <Tabs.Tab label="모자" value={DECORATION_TYPE.CAP} />
        <Tabs.Tab label="얼굴" value={DECORATION_TYPE.FACE} />
        <Tabs.Tab label="소품" value={DECORATION_TYPE.ACCESSORY} />
      </Tabs>
      <TabPanel>
        {DECORATION_PAIRS[type].map((id) => (
          <CustomizeOption
            key={id}
            id={id}
            name={type}
            checked={findDecoration(type)?.decorationValue === id}
            onChange={handleDecoChange}
          />
        ))}
      </TabPanel>
    </section>
  );
}

export default CustomizeMonster;
