'use client';

import { ChangeEvent, ComponentPropsWithRef, useState } from 'react';

import cn from '@utils/cn';

import Text from './common/Text';

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
      <div className="relative h-[50px]">
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
            // 이후 autoprefixer 적용 개선
            // webkit
            'webkit-slider:h-40 webkit-slider:w-40 webkit-slider:appearance-none webkit-slider:rounded-circular webkit-slider:bg-[var(--color-brand-primary-base)] webkit-slider:shadow-0',
            // moz
            'moz-slider:h-40 moz-slider:w-40 moz-slider:appearance-none moz-slider:rounded-circular moz-slider:bg-[var(--color-brand-primary-base)] moz-slider:shadow-0',
            // ms
            'ms-slider:h-40 ms-slider:w-40 ms-slider:appearance-none ms-slider:rounded-circular ms-slider:bg-[var(--color-brand-primary-base)] ms-slider:shadow-0',
          )}
          {...restProps}
        />
      </div>

      {displayInterval && (
        <ul className="grid w-full grid-cols-11	grid-rows-1 justify-between text-center">
          {Array(11)
            .fill(1)
            .map((interval, idx) => {
              const stepVal = interval * idx * 10;
              return (
                <Text
                  component="li"
                  key={stepVal}
                  variant="label-2"
                  color="alternative"
                >
                  {idx === 0 ? interval : stepVal}
                </Text>
              );
            })}
        </ul>
      )}
    </div>
  );
}

export default Slider;
