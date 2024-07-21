'use client';

import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import CharacterCanvas from '@components/CharacterCanvas';
import BaseText from '@components/common/Text/BaseText';
import TextField from '@components/common/TextField';

import stringToElement from '@utils/string-to-element';

import { UserInfo } from '../../../../(auth)/signup/context/context.type';
import useMonsterLayout from '../hooks/useMonsterLayout';

function MonsterName() {
  const { setBtnDisabled } = useMonsterLayout();

  const {
    control,
    register,
    getValues,
    formState: { errors },
  } = useFormContext<UserInfo>();

  const monsterName = useWatch({ control, name: 'monsterName' });
  const story = useWatch({ control, name: 'story' });

  useEffect(() => {
    setBtnDisabled(
      !!errors.monsterName || !!errors.story || !monsterName || !story,
    );
  }, [monsterName, story, errors]);

  return (
    <>
      <div className="flex flex-col items-center gap-8">
        <BaseText
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
        </BaseText>
        <div className="relative mx-auto flex h-[120px] w-[120px] items-center justify-center overflow-hidden">
          <CharacterCanvas
            width={300}
            height={300}
            type={getValues('emotion') === 'ANGER' ? 'mad' : 'sad'}
            className="left-auto right-auto m-auto h-[150px] w-[150px] overflow-hidden"
          />
        </div>
      </div>
      <div>
        <TextField
          fullWidth
          id="monster_name"
          label="이름"
          className="mb-1"
          placeholder="퇴사몬의 이름을 지어주세요"
          helperText="2~6자로 입력해주세요"
          error={!!errors.monsterName}
          {...register('monsterName', {
            required: true,
            minLength: 2,
            maxLength: 6,
          })}
        />

        <TextField
          id="story"
          fullWidth
          multiline
          error={!!errors.story}
          className="mt-24 h-36 bg-[#70737C]/30"
          {...register('story', {
            required: true,
            maxLength: 500,
          })}
        />
      </div>
    </>
  );
}

export default MonsterName;
