'use client';

import { FormEventHandler, useEffect } from 'react';

import TextField from '@components/common/TextField';

import { createUserName, modifyUserName } from '@api/auth/nickname';

import useWithAuth from 'src/app/hooks/useWithAuth';

import useSignUpContext from '../hooks/useSignUpContext';
import useUserInfoContext from '../hooks/useUserInfoContext';
import useUserInfoDispatchContext from '../hooks/useUserInfoDispatchContext';

const validateValue = (value: string) => {
  return value.length >= 2 && value.length <= 6;
};

function MakeNickName() {
  const { setBtnDisabled, registerCallback } = useSignUpContext();
  const { nickname: userName, code } = useUserInfoContext();
  const { update } = useUserInfoDispatchContext();

  const message = '닉네임은 2~6자 이내로 입력해주세요';
  const disabled = !validateValue(userName);
  const error = (!!userName && disabled && message) || '';

  const withAuth = useWithAuth();
  const handleClick = withAuth(async () => {
    const method = code === 100 ? createUserName : modifyUserName;

    return true;

    return method(userName)
      .then(() => true)
      .catch(() => false);
  });

  const handleInput: FormEventHandler = (e) => {
    const { value } = e.target as HTMLInputElement;
    update({ nickname: value });
  };

  useEffect(() => {
    setBtnDisabled(userName.length < 2 || userName.length > 6);
  }, [userName]);

  useEffect(() => {
    registerCallback(handleClick);
  }, []);

  return (
    <div className="flex flex-col justify-between">
      <TextField
        id="nickName"
        label="닉네임"
        value={userName}
        onChange={handleInput}
        placeholder="닉네임을 입력해주세요"
        {...{ helperText: message }}
        {...(error ? { error: true } : {})}
      />
    </div>
  );
}

export default MakeNickName;
