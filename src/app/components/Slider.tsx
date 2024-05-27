'use client';

import { ChangeEvent, ComponentPropsWithRef, useState } from 'react';

import cn from '@utils/cn';

interface Props extends ComponentPropsWithRef<'input'> {
  max: number;
  min: number;
  step: number;
  defaultValue?: number;
  color?: string;
  displayInterval?: boolean;
}

function Slider({
  ref,
  min,
  max,
  color,
  onChange,
  className,
  defaultValue = 0,
  displayInterval = false,
  ...restProps
}: Props) {
  const [value, setValue] = useState(defaultValue || min);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setValue(Number(target.value));

    onChange?.(e);
  };

  const calculateBackground = () => {
    const percentage = ((value - min) / (max - min)) * 100;
    return `linear-gradient(90deg, ${color || 'var(--color-brand-primary-base)'} ${percentage}%, #70737C38 ${percentage}%)`;
  };

  return (
    <div className={className}>
      <div className="relative h-[62px]">
        <div
          aria-hidden
          className="absolute top-0 h-12 w-full translate-y-1/2 rounded-circular border border-[#70737C52] bg-transparent"
        />
        <input
          ref={ref}
          min={min}
          max={max}
          type="range"
          value={value}
          onChange={handleChange}
          style={{ background: calculateBackground() }}
          className={cn(
            'absolute top-0 h-12 w-full translate-y-1/2 appearance-none rounded-circular outline-none',
            'webkit-slider:h-48 webkit-slider:w-48 webkit-slider:appearance-none webkit-slider:rounded-circular webkit-slider:bg-[var(--color-brand-primary-base)] webkit-slider:shadow-0',
            'moz-slider:h-48 moz-slider:w-48 moz-slider:appearance-none moz-slider:rounded-circular moz-slider:bg-[var(--color-brand-primary-base)] moz-slider:shadow-0',
            'ms-slider:h-48 ms-slider:w-48 ms-slider:appearance-none ms-slider:rounded-circular ms-slider:bg-[var(--color-brand-primary-base)] ms-slider:shadow-0',
          )}
          {...restProps}
        />
      </div>

      {displayInterval && (
        <ul className="label-2-regular flex w-full justify-between  text-[var(--color-base-cool-neutral-80-a)]">
          {Array(11)
            .fill(1)
            .map((interval, idx) => {
              return (
                <li key={interval}>
                  <span>{idx === 0 ? interval : interval * idx * 10}</span>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
}

export default Slider;
