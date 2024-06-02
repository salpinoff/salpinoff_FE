'use client';

import { ChangeEvent, useEffect } from 'react';

import TextField from '@components/common/TextField';

import useSignUpContext from '../../(auth)/signup/hooks/useSignUpContext';
import useUserInfoContext from '../../(auth)/signup/hooks/useUserInfoContext';
import useUserInfoDispatchContext from '../../(auth)/signup/hooks/useUserInfoDispatchContext';

function MonsterName() {
  const { setBtnDisabled } = useSignUpContext();
  const { monsterName, story } = useUserInfoContext();
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
    <div className="">
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
  );
}

export default MonsterName;
