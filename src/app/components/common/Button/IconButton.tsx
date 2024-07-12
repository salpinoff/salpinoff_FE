import Icon from '@components/common/Icon';

import cn from '@utils/cn';

import { ExtractProps } from '@type/util';

import Button from '.';

export type IconButtonProps = Omit<ExtractProps<typeof Button>, 'size'> &
  Pick<ExtractProps<typeof Icon>, 'name' | 'size' | 'stroke'>;

export default function IconButton({
  className,
  name,
  size,
  stroke,
  ...rest
}: IconButtonProps) {
  return (
    <Button
      className={cn('h-[24px] w-[24px] p-0', className)}
      variant="ghost"
      {...rest}
    >
      <Icon name={name} size={size} stroke={stroke} />
    </Button>
  );
}