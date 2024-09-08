'use client';

import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { LazyMotion, domAnimation, m } from 'framer-motion';

import CharacterCanvas from '@components/CharacterCanvas';
import Text from '@components/common/Text';
import TextField from '@components/common/TextField';

import stringToElement from '@utils/string-to-element';

import { visible, fadeIn, hidden } from '@constant/animation';

import { UserInfo } from '../../../../(auth)/signup/context/context.type';
import useMonsterLayout from '../hooks/useMonsterLayout';

function MonsterName() {
  const { setBtnDisabled } = useMonsterLayout();

  const {
    control,
    register,
    getValues,
    formState: {
      errors: { monsterName: monsterNameError },
    },
  } = useFormContext<UserInfo>();

  const monsterName = useWatch({ control, name: 'monsterName' });

  useEffect(() => {
    setBtnDisabled(!!monsterNameError);
  }, [monsterName, monsterNameError]);

  return (
    <>
      <LazyMotion features={domAnimation}>
        <m.div
          className="flex flex-col items-center gap-8"
          initial="hidden"
          animate="visible"
          exit={{ ...hidden, transition: { duration: 0.3 } }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.3, staggerDirection: -1 },
            },
          }}
        >
          <m.div variants={fadeIn}>
            <Text
              variant="label-2"
              color="strong"
              className="relative w-max rounded-[16px] bg-cool-neutral-17 px-[20px] py-[16px] text-center shadow-3"
            >
              {stringToElement(['나의 감정을 담은', '퇴사몬이 등장했어요!'])}
              <span
                style={{
                  display: 'block',
                  position: 'absolute',
                  width: '10px',
                  height: '10px',
                  left: 0,
                  right: 0,
                  bottom: -5,
                  background: 'inherit',
                  transform: 'rotate(45deg)',
                  margin: 'auto',
                }}
              />
            </Text>
          </m.div>
          <m.div
            variants={{
              hidden: { ...hidden, y: 5 },
              visible,
            }}
            className="relative mx-auto flex h-[120px] w-[120px] items-center justify-center overflow-hidden"
          >
            <CharacterCanvas
              width={300}
              height={300}
              type={getValues('emotion') === 'ANGER' ? 'mad' : 'sad'}
              className="left-auto right-auto m-auto h-[150px] w-[150px] translate-y-0 overflow-hidden"
            />
          </m.div>
        </m.div>
      </LazyMotion>
      <div className="flex flex-col gap-[25px]">
        <TextField
          fullWidth
          id="monster_name"
          label="이름"
          placeholder="퇴사몬의 이름을 지어주세요"
          helperText="2~6자로 입력해주세요"
          error={!!monsterNameError}
          {...register('monsterName', {
            required: true,
            minLength: 2,
            maxLength: 6,
          })}
        />

        <TextField
          id="story"
          className="bg-[#70737C]/12 h-28"
          value={getValues('story')}
          fullWidth
          multiline
          readOnly
        />
      </div>
    </>
  );
}

export default MonsterName;
