import { useRouter } from 'next/navigation';

import { FormEventHandler, useEffect, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';

import { findIndex, xorBy, unionBy } from 'lodash';

import CharacterCanvas from '@components/CharacterCanvas';
import BaseText from '@components/common/Text/BaseText';

import useWithAuth from '@hooks/useWithAuth';

import cn from '@utils/cn';
import { findObjectInArray } from '@utils/find';

import { createMonster } from '@api/monster';
import {
  DecorationType,
  DecorationValue,
  Emotion,
  DecorationTypes,
  DecorationValues,
} from '@api/schema/monster';

import { UserInfo } from '../../../../(auth)/signup/context/context.type';
import useSignUpContext from '../../../../(auth)/signup/hooks/useSignUpContext';
import CustomizeOption from '../../../component/CustomizeOption';
import Tabs from '../../../component/Tabs';

function CustomizeMonster() {
  const { replace } = useRouter();
  const { setBtnDisabled, registerCallback } = useSignUpContext();
  const { getValues, control } = useFormContext<UserInfo>();

  const emotion = getValues('emotion');
  const decorations = useWatch({
    control,
    name: 'decorations',
    exact: true,
  });

  const CHARACTER_TYPE = emotion === Emotion.ANGER ? 'mad' : 'sad';
  const CHARACTER_ITEMS =
    (decorations
      ?.map(
        (deco) =>
          deco.decorationType !== DecorationType.BACKGROUND_COLOR &&
          deco.decorationValue.toLowerCase(),
      )
      .filter(Boolean) as string[]) || [];

  const withAuth = useWithAuth();
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
    DecorationType.BACKGROUND_COLOR,
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

  const handleClick = () => {
    return create({
      rating: getValues('stress'),
      content: getValues('story'),
      emotion: emotion !== '' ? emotion : 'DEPRESSION',
      monsterName: getValues('monsterName'),
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
      {/* [TODO]: 제공 배경 색상 값 이후 수정 */}
      <div className="relative mx-auto mb-[32px] h-[260px] w-[260px] overflow-hidden rounded-[36px] shadow-5">
        <CharacterCanvas
          width={520}
          height={520}
          background={
            findDecoration(DecorationType.BACKGROUND_COLOR)?.decorationValue
          }
          type={CHARACTER_TYPE}
          items={CHARACTER_ITEMS}
        />
      </div>

      <Tabs<DecorationTypes>
        className="mb-20 flex gap-12"
        value={type}
        onChange={handleFilterChange}
      >
        <Tabs.Tab label="배경" value={DecorationType.BACKGROUND_COLOR} />
        <Tabs.Tab label="모자" value={DecorationType.CAP} />
        <Tabs.Tab label="얼굴" value={DecorationType.FACE} />
        <Tabs.Tab label="소품" value={DecorationType.ACCESSORY} />
      </Tabs>

      <div className={cn('flex gap-[16px] overflow-x-auto', 'scrollbar-hide')}>
        {DecorationValue[type].map((id) => (
          <Controller
            key={id}
            control={control}
            name="decorations"
            render={({ field: { onChange } }) => {
              const handleChange: FormEventHandler = (e) => {
                const { value } = e.target as HTMLInputElement;

                if (type && value) {
                  const updatedDecorations = updateDecoration(
                    type,
                    value as DecorationValues,
                  );

                  onChange(updatedDecorations);
                }
              };

              return (
                <CustomizeOption
                  id={id}
                  name={type}
                  checked={findDecoration(type)?.decorationValue === id}
                  onChange={handleChange}
                />
              );
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default CustomizeMonster;
