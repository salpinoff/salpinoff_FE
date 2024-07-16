'use client';

import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import TextField from '@components/common/TextField';

import { createUserName, modifyUserName } from '@api/auth/nickname';

import useWithAuth from 'src/app/hooks/useWithAuth';

import type { UserInfo } from '../context/context.type';

import useSignUpContext from '../hooks/useSignUpContext';

function MakeNickName() {
  const { setBtnDisabled, registerCallback } = useSignUpContext();
  const {
    register,
    formState: {
      defaultValues,
      errors: { userName: nameError },
    },
  } = useFormContext<UserInfo>();

  const userName = defaultValues?.userName || '';
  const code = defaultValues?.code || 100;

  const withAuth = useWithAuth();
  const handleClick = withAuth(async () => {
    const method = code === 100 ? createUserName : modifyUserName;

    return method(userName)
      .then(() => true)
      .catch(() => false);
  });

  useEffect(() => {
    setBtnDisabled(userName.length < 2 || userName.length > 6);
  }, [userName]);

  useEffect(() => {
    registerCallback(handleClick);
  }, [handleClick]);

  return (
    <div className="flex flex-col justify-between">
      <TextField
        id="nickName"
        label="닉네임"
        error={!!nameError}
        placeholder="닉네임을 입력해주세요"
        helperText="닉네임은 2~6자 이내로 입력해주세요"
        {...register('userName', {
          required: true,
          minLength: 2,
          maxLength: 6,
        })}
      />
    </div>
  );
}

export default MakeNickName;
