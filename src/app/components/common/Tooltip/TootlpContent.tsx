import {
  ComponentPropsWithRef,
  ReactElement,
  Ref,
  forwardRef,
  useContext,
} from 'react';

import CloseSVG from '@public/icons/close.svg';

import cn from '@utils/cn';
import stringToElement from '@utils/string-to-element';

import { tooltipContext } from './TooltipProvider';
import BaseText from '../Text/BaseText';

type Props = Omit<ComponentPropsWithRef<typeof BaseText>, 'children'> & {
  ref?: Ref<HTMLElement>;
  closeIcon?: ReactElement;
  iconDisplay?: boolean;
};

const TooltipContent = forwardRef<HTMLDivElement, Props>(
  (
    {
      style,
      className,
      closeIcon: CloseIcon = CloseSVG,
      iconDisplay = true,
      ...restProps
    },
    ref,
  ) => {
    const { content, toggleOpen } = useContext(tooltipContext);

    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          'flex w-[max-content] items-center gap-16',
          'rounded-8 bg-blue-60 text-white',
          className,
        )}
      >
        <BaseText
          maxRows={2}
          variant="label-1"
          weight="regular"
          color="normal"
          {...restProps}
        >
          {stringToElement(content)}
        </BaseText>

        <button
          onClick={toggleOpen}
          className={cn('w-[24px] flex-none self-start', {
            hidden: !iconDisplay,
          })}
        >
          <span className="a11yHidden">닫기</span>
          <CloseIcon />
        </button>
      </div>
    );
  },
);

TooltipContent.displayName = 'TooltipContent';

export { TooltipContent };
