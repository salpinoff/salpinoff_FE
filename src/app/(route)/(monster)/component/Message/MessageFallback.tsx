import { ComponentProps } from 'react';

import Icon from '@components/common/data-display/Icon';
import Text from '@components/common/Text';

import cn from '@utils/cn';

interface Props extends ComponentProps<typeof Text> {
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
      <Text variant="label-1" weight="regular" color="assistive" {...restProps}>
        {label}
      </Text>
    </div>
  );
}

export default MessageFallback;
