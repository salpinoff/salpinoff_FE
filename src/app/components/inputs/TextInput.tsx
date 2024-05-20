'use client';

import { ChangeEventHandler, ComponentPropsWithRef, useState } from 'react';

import InfoIcon from '@public/icons/info.svg';

import cn from '@utils/cn';

interface Props extends ComponentPropsWithRef<'input'> {
  id: string;
  label?: string;
  error?: string;
  guide?: string;
}

function TextInput({
  id,
  label,
  error,
  guide,
  className,
  onChange,
  ...restProps
}: Props) {
  const [inputValue, setValue] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target as HTMLInputElement;
    setValue(value);

    onChange?.(e);
  };

  return (
    <div className={cn('label-1-regular w-full space-y-12', className)}>
      <label htmlFor={id} className="block text-cool-neutral-90A">
        {label}
      </label>

      <div
        className={cn(
          'rounded-12 border border-[#70737C52] bg-[#70737C38] px-16 py-12',
          { 'border-none bg-[#70737C38]': inputValue !== '' },
        )}
      >
        <input
          id={id}
          type="text"
          autoComplete="off"
          className={cn(
            'w-full bg-transparent text-white',
            'placeholder:text-cool-neutral-80A',
          )}
          onChange={handleChange}
          {...restProps}
        />
      </div>

      <span className="label-2-regular block text-cool-neutral-80A">
        {!error && guide}
      </span>

      <span className="label-2-regular flex items-center space-x-4 text-[var(--color-text-danger)]">
        {error && (
          <>
            <span className="inline-block h-20 w-20">
              <InfoIcon />
            </span>
            <span>{error}</span>
          </>
        )}
      </span>
    </div>
  );
}

export default TextInput;
