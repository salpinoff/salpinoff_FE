import { PropsOfFn } from '@type/util';

import { useBottomSheetCore } from './core';
import { useMouseEvent } from './useMouseEvent';
import { useTouchEvent } from './useTouchEvent';

type Props = PropsOfFn<typeof useBottomSheetCore>;

const useBottomSheet = (props: Props) => {
  const { refs, event } = useBottomSheetCore(props);

  useMouseEvent({ refs, event });
  useTouchEvent({ refs, event });

  return { ...refs };
};

export default useBottomSheet;
