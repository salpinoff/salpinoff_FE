'use client';

import { FormEventHandler, useState } from 'react';

import BaseButton from '@components/common/Button/BaseButton';
import FixedBottom from '@components/FixedBottom';
import TextInput from '@components/inputs/TextInput';

import useAuth from 'src/app/hooks/api/useAuth';
import useFixedBottom from 'src/app/hooks/useFixedBottom';
import useWithAuth from 'src/app/hooks/useWithAuth';

function MakeNickName() {
  const [userName, setUserName] = useState('');
  const [bottom, setBottom, toggleTouchAction] = useFixedBottom(0);

  const { status } = useAuth();
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
    setUserName(value);
  };

  const handleBlur = () => {
    toggleTouchAction();
    setBottom(0);
  };

  const message = '닉네임은 2~6자 이내로 입력해주세요';
  const disabled = !validateValue(userName);
  const guide = (!userName && message) || '';
  const error = (!!userName && disabled && message) || '';

  return (
    <div className="flex flex-col justify-between">
      <TextInput
        id="nickName"
        label="닉네임"
        guide={guide}
        error={error}
        value={userName}
        onBlur={handleBlur}
        onFocus={toggleTouchAction}
        onChange={handleInput}
        placeholder="닉네임을 입력해주세요"
        className="mt"
      />

      <FixedBottom className="p-5" style={{ bottom: `${bottom}px` }}>
        <BaseButton
          primary
          type="button"
          className="w-full"
          disabled={disabled || status === 'loading'}
          onClick={handleSubmit}
        >
          다음으로
        </BaseButton>
      </FixedBottom>
    </div>
  );
}

export default MakeNickName;
