'use client';

import { ChangeEvent, useEffect } from 'react';

import CharacterCanvas from '@components/CharacterCanvas';
import BaseText from '@components/common/Text/BaseText';
import TextField from '@components/common/TextField';

import stringToElement from '@utils/string-to-element';

import useSignUpContext from '../../(auth)/signup/hooks/useSignUpContext';
import useUserInfoContext from '../../(auth)/signup/hooks/useUserInfoContext';
import useUserInfoDispatchContext from '../../(auth)/signup/hooks/useUserInfoDispatchContext';

function MonsterName() {
  const { setBtnDisabled } = useSignUpContext();
  const { monsterName, story, emotion } = useUserInfoContext();
  const { update } = useUserInfoDispatchContext();

  const hanleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    update({ monsterName: value });
  };

  const handleChangeStory = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    update({ story: value });
  };

  useEffect(() => {
    const isValidName = monsterName.length >= 2 && monsterName.length <= 6;
    const isValidStory = story.length !== 0 && story.length <= 500;

    setBtnDisabled(!isValidName || !isValidStory);
  }, [monsterName, story]);

  return (
    <>
      <div className="flex flex-col items-center gap-8">
        <BaseText
          variant="label-2"
          color="strong"
          className="relative w-max rounded-[16px] bg-cool-neutral-17 px-[20px] py-[16px] shadow-3"
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
            type={emotion === 'ANGER' ? 'mad' : 'sad'}
            className="left-auto right-auto m-auto h-[150px] w-[150px] overflow-hidden"
          />
        </div>
      </div>
      <div>
        <TextField
          id="monster_name"
          label="이름"
          value={monsterName}
          fullWidth
          onChange={hanleChangeName}
          error={monsterName.length > 6}
          helperText="2~6자로 입력해주세요"
          className="mb-1"
        />

        <TextField
          id="story"
          fullWidth
          multiline
          value={story}
          onChange={handleChangeStory}
          className="mt-24 h-28 bg-[#70737C]/30"
        />
      </div>
    </>
  );
}

export default MonsterName;
