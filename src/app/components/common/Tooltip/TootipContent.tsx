import { ComponentPropsWithoutRef, forwardRef, useContext } from 'react';

import Text from '@components/common/Text';

import cn from '@utils/cn';
import stringToElement from '@utils/string-to-element';

import { tooltipContext } from './TooltipProvider';
import IconButton from '../IconButton';

type Props = Omit<ComponentPropsWithoutRef<typeof Text>, 'children'> & {
  iconDisplay?: boolean;
};

const TooltipContent = forwardRef<HTMLDivElement, Props>(
  ({ style, children, className, iconDisplay = true, ...restProps }, ref) => {
    const { content, toggleOpen } = useContext(tooltipContext);

    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          'flex w-[max-content] items-center gap-16',
          'z-[1] rounded-8 bg-blue-60 text-white',
          className,
        )}
      >
        <Text
          maxRows={2}
          variant="label-1"
          weight="regular"
          color="normal"
          {...restProps}
        >
          {stringToElement(content)}
        </Text>
        {iconDisplay && (
          <IconButton
            className={cn('flex-none self-start')}
            name="close"
            aria-label="닫기"
            onClick={toggleOpen}
          >
            <span className="a11yHidden">닫기</span>
          </IconButton>
        )}
        {children}
      </div>
    );
  },
);

TooltipContent.displayName = 'TooltipContent';

export { TooltipContent };
