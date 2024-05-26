'use client';

import { FormEventHandler, useEffect, useState } from 'react';

import TextInput from '@components/inputs/TextInput';

import useSignUpContext from '../hooks/useSignUpContext';

function MakeNickName() {
  const [userName, setUserName] = useState('');
  const { setBtnDisabled } = useSignUpContext();

  const validateValue = (value: string) => {
    return value.length >= 2 && value.length <= 6;
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
  };

  const handleInput: FormEventHandler = (e) => {
    const { value } = e.target as HTMLInputElement;
    setUserName(value);
  };

  const message = '닉네임은 2~6자 이내로 입력해주세요';
  const disabled = !validateValue(userName);
  const guide = (!userName && message) || '';
  const error = (!!userName && disabled && message) || '';

  useEffect(() => {
    setBtnDisabled(userName.length === 0 || userName.length > 6);
  }, [userName]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-between">
      <TextInput
        id="nickName"
        label="닉네임"
        guide={guide}
        error={error}
        value={userName}
        onChange={handleInput}
        placeholder="닉네임을 입력해주세요"
        className="mt"
      />
    </form>
  );
}

export default MakeNickName;
