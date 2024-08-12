import { useRouter } from 'next/navigation';

import {
  FormEventHandler,
  useEffect,
  useState,
  PropsWithChildren,
} from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';

import { findIndex, xorBy, unionBy } from 'lodash';

import CharacterCanvas from '@components/CharacterCanvas';
import Tabs from '@components/common/Tabs';
import Text from '@components/common/Text';

import useWithAuth from '@hooks/useWithAuth';

import { getCharacterTypeByEmotion } from '@utils/client/transform-monster';
import cn from '@utils/cn';
import { findObjectInArray } from '@utils/find';
import { getQueryClient } from '@utils/query/get-query-client';

import { createMonster } from '@api/monster';
import MonsterQueryFactory from '@api/monster/query/factory';
import { DECORATION_TYPE, EMOTION } from '@api/schema/monster';

import { UserInfo } from 'src/app/(route)/(auth)/signup/context/context.type';

import CustomizeOption from '../../../component/CustomizeOption';
import { DECORATION_PAIRS } from '../../../constants/decorations';
import useMonsterLayout from '../hooks/useMonsterLayout';

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
  const { setBtnDisabled, registerCallback } = useMonsterLayout();
  const { getValues, control } = useFormContext<UserInfo>();

  const emotion = getValues('emotion');
  const decorations = useWatch({
    control,
    name: 'decorations',
    exact: true,
  });

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

  const withAuth = useWithAuth();

  const { mutate: create } = useMutation({
    mutationKey: ['creatMonster'],
    mutationFn: createMonster,
    onMutate: () => withAuth(() => {}),
    onSuccess: (data) => {
      const queryClient = getQueryClient();

      replace(`/monster/${data.data.monsterId}/result`);

      queryClient.invalidateQueries({
        queryKey: MonsterQueryFactory.reference.queryKey,
        exact: true,
      });
    },
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
      <Text
        component="h3"
        variant="headline-1"
        weight="semibold"
        color="normal"
        className="mb-[37px]"
      >
        이제 퇴사몬을 꾸며주세요!
      </Text>
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
      </TabPanel>
    </section>
  );
}

export default CustomizeMonster;
