'use client';

import { ChangeEvent, useEffect } from 'react';

import TextField from '@components/common/TextField';

import useSignUpContext from '../../(auth)/signup/hooks/useSignUpContext';
import useUserInfoContext from '../../(auth)/signup/hooks/useUserInfoContext';

function MonsterName() {
  const { setBtnDisabled } = useSignUpContext();
  const {
    state: {
      monster: { name },
      story,
    },
    updater,
  } = useUserInfoContext();

  const hanleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    updater({ payload: { monster: { name: value, background: '' } } });
  };

  const handleChangeStory = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    updater({ payload: { story: value } });
  };

  useEffect(() => {
    const isValidName = name.length >= 2 && name.length <= 6;
    const isValidStory = story.length !== 0 && story.length <= 500;

    setBtnDisabled(!isValidName || !isValidStory);
  }, [name, story]);

  return (
    <div className="">
      <TextField
        id="monster_name"
        label="이름"
        value={name}
        fullWidth
        onChange={hanleChangeName}
        error={name.length > 6}
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