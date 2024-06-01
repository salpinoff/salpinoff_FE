import React from 'react';

import FormControlLabel, {
  type FormControlLabelProps,
} from '@components/common/FormControlLabel';

import { DecorationType } from '@api/schema/monster';

import { Color, type ColorProps } from './Color';
import { ImageItem } from './ImageItem';

type CustomizeOptionProps = Omit<
  FormControlLabelProps<'label'>,
  'label' | 'control' | 'value'
> & {
  name: keyof typeof DecorationType;
};

const OptionLookUpTable = {
  [DecorationType.BACKGROUND_COLOR]: Color,
  [DecorationType.ACCESORY]: ImageItem,
  [DecorationType.STICKER]: ImageItem,
  [DecorationType.SPEECH_BUBBLE]: ImageItem,
};

export default function CustomizeOption({
  id,
  name,
  checked,
  onChange,
}: CustomizeOptionProps) {
  if (typeof OptionLookUpTable[name] !== 'undefined') {
    const labelProps =
      name === DecorationType.BACKGROUND_COLOR
        ? ({
            color: id,
          } as ColorProps)
        : {};

    return (
      <FormControlLabel
        className="relative flex aspect-square h-64 w-64 items-center justify-center rounded-[16px] border-2 border-transparent bg-[#70737C38] p-[14px] has-[:checked]:!border-common-100 has-[:checked]:bg-cool-neutral-7"
        id={id}
        name={name}
        value={id}
        checked={checked}
        label={React.createElement(OptionLookUpTable[name], labelProps)}
        control={<input className="a11yHidden" type="radio" />}
        onChange={onChange}
      />
    );
  }
  return <div>존재하지 않습니다.</div>;
}
