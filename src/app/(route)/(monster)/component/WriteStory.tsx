'use client';

import { ChangeEvent, useEffect } from 'react';

import TextField from '@components/common/TextField';

import useSignUpContext from '../../(auth)/signup/hooks/useSignUpContext';
import useUserInfoContext from '../../(auth)/signup/hooks/useUserInfoContext';
import useUserInfoDispatchContext from '../../(auth)/signup/hooks/useUserInfoDispatchContext';

const MAX_LENGTH = 500;

function WriteStory() {
  const { story } = useUserInfoContext();
  const { update } = useUserInfoDispatchContext();
  const { setBtnDisabled } = useSignUpContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    update({ story: value });
  };

  useEffect(() => {
    setBtnDisabled(story.length === 0);
  }, [story]);

  return (
    <TextField
      id="story"
      value={story}
      label="스트레스 상황"
      className="h-[144px]"
      helperText={`${story.length}/${MAX_LENGTH}`}
      placeholder="ex. 오늘도 야근 실화임..? 월세 아까워"
      onChange={handleChange}
      maxLength={MAX_LENGTH}
      fullWidth
      multiline
    />
  );
}

export default WriteStory;
