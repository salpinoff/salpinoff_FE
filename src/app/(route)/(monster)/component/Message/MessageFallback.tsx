import { ComponentProps } from 'react';

import Icon from '@components/common/data-display/Icon';
import BaseText from '@components/common/Text/BaseText';

import cn from '@utils/cn';

interface Props extends ComponentProps<typeof BaseText> {
  label?: string;
  className?: string;
}

function MessageFallback({
  label = '메시지가 없어요',
  className,
  ...restProps
}: Props) {
  return (
    <div
      className={cn(
        'text-[#70737C47]',
        'col-span-2 col-start-2 w-full',
        'flex flex-col items-center justify-center gap-8',
        className,
      )}
    >
      <Icon name="message" size={24} className="w-24" />
      <BaseText
        variant="label-1"
        weight="regular"
        color="assistive"
        {...restProps}
      >
        {label}
      </BaseText>
    </div>
  );
}

export default MessageFallback;
