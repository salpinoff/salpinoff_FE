'use client';

import { FormEventHandler, useEffect } from 'react';

import TextField from '@components/common/TextField';

import useWithAuth from 'src/app/hooks/useWithAuth';

import useSignUpContext from '../hooks/useSignUpContext';
import useUserInfoContext from '../hooks/useUserInfoContext';

function MakeNickName() {
  const {
    state: { nickname: userName },
    updater,
  } = useUserInfoContext();
  const { setBtnDisabled } = useSignUpContext();

  const withAuth = useWithAuth();

  const validateValue = (value: string) => {
    return value.length >= 2 && value.length <= 6;
  };

  const handleSubmit = withAuth<FormEventHandler>((e) => {
    // e.preventDefault();
    console.log('data fetching', e.target);
  });

  const handleInput: FormEventHandler = (e) => {
    const { value } = e.target as HTMLInputElement;
    updater({ payload: { nickname: value } });
  };

  const message = '닉네임은 2~6자 이내로 입력해주세요';
  const disabled = !validateValue(userName);
  const error = (!!userName && disabled && message) || '';

  useEffect(() => {
    setBtnDisabled(userName.length < 2 || userName.length > 6);
  }, [userName]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-between">
      <TextField
        id="nickName"
        label="닉네임"
        value={userName}
        onChange={handleInput}
        placeholder="닉네임을 입력해주세요"
        {...{ helperText: message }}
        {...(error ? { error: true } : {})}
      />
    </form>
  );
}

export default MakeNickName;
