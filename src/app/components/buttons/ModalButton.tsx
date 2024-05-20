import BaseButton from '@components/buttons/BaseButton';

import cn from '@utils/cn';

import type { ExtractProps } from '@type/utility';

type Props = ExtractProps<typeof BaseButton>;

function ModalButton({ className, ...restProps }: Props) {
  return (
    <BaseButton
      className={cn('label-1-medium rounded-8 py-12', className)}
      {...restProps}
    />
  );
}

export default ModalButton;
