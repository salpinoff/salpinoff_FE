import { useRef } from 'react';
import toast, { Toaster, resolveValue } from 'react-hot-toast';

import Text from '@components/common/Text';

import useOutsideClick from '@hooks/useOutsideClick';

import cn from '@utils/cn';

export default function HelperToast() {
  const ref = useRef(null);

  useOutsideClick(ref, () => toast.dismiss(), 'mousedown');

  return (
    <Toaster
      containerStyle={{
        position: 'absolute',
      }}
      position="bottom-center"
      toastOptions={{
        duration: 999999, // 인터랙션 시작 시, dismiss 처리
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      }}
    >
      {(t) => (
        <div
          ref={ref}
          role="none"
          className={cn(
            t.visible ? 'animate-enter' : 'animate-leave',
            'flex h-max w-max items-center justify-center rounded-circular bg-[#171719bd] px-[16px] py-[9px]',
          )}
        >
          <Text
            component="span"
            variant="label-2"
            weight="medium"
            color="normal"
          >
            {resolveValue(t.message, t)}
          </Text>
        </div>
      )}
    </Toaster>
  );
}
