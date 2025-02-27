'use client';

import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import TextField from '@components/common/TextField';

import { createUserName, modifyUserName } from '@api/auth/nickname';

import useWithAuth from 'src/app/hooks/useWithAuth';

import type { UserInfo } from '../context/context.type';

import useMonsterLayout from '../../../(monster)/monster/produce/hooks/useMonsterLayout';

function MakeNickName() {
  const { setBtnDisabled, registerCallback } = useMonsterLayout();
  const {
    control,
    register,
    getValues,
    formState: {
      defaultValues,
      errors: { userName: nameError },
    },
  } = useFormContext<UserInfo>();

  const userName = useWatch({ control, name: 'userName' });
  const code = defaultValues?.code || 100;

  const withAuth = useWithAuth();
  const handleClick = withAuth(async () => {
    const method = code === 100 ? createUserName : modifyUserName;

    return method(getValues('userName'))
      .then(() => true)
      .catch(() => false);
  });

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
