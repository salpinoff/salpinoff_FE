import Image from 'next/image';

import React from 'react';

import FormControlLabel, {
  type FormControlLabelProps,
} from '@components/common/FormControlLabel';

import { DecorationType, DecorationTypes } from '@api/schema/monster';

type CustomizeOptionProps = Omit<
  FormControlLabelProps<'label'>,
  'label' | 'control' | 'value'
> & {
  name: DecorationTypes;
};

const OptionLookUpTable = {
  [DecorationType.BACKGROUND_COLOR]: 'div',
  [DecorationType.CAP]: Image,
  [DecorationType.FACE]: Image,
  [DecorationType.ACCESSORY]: Image,
};

export default function CustomizeOption({
  id,
  name,
  checked,
  onChange,
}: CustomizeOptionProps) {
  if (OptionLookUpTable[name]) {
    const Label =
      name === DecorationType.BACKGROUND_COLOR
        ? React.createElement(OptionLookUpTable[name], {
            className:
              'relative aspect-square min-h-[36px] min-w-[36px]	rounded-circular',
            style: {
              background: id,
            },
          })
        : React.createElement(OptionLookUpTable[name], {
            alt: id.toLowerCase(),
            // TODO 경로 하드코딩 수정
            src: `/images/items/preview/${id.toLocaleLowerCase()}0000.png`,
            width: 52,
            height: 52,
            // placeholder: 'blur',
            // blurDataURL: '',
          });

    return (
      <FormControlLabel
        className="relative flex aspect-square h-64 w-64 items-center justify-center rounded-[16px] border-2 border-transparent bg-[#70737C38] p-4 has-[:checked]:!border-common-100 has-[:checked]:bg-cool-neutral-7"
        id={id}
        name={name}
        value={id}
        checked={checked}
        label={Label}
        control={<input className="a11yHidden" type="checkbox" />}
        onChange={onChange}
      />
    );
  }

  return <div>존재하지 않습니다.</div>;
}
