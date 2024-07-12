import {
  ComponentPropsWithRef,
  FC,
  MouseEventHandler,
  forwardRef,
  useContext,
} from 'react';

import TooltipSVG from '@public/icons/tooltip.svg';

import { tooltipContext } from './TooltipProvider';
import FormHelperText from '../TextField/FormHelperText';

type Props = Omit<
  ComponentPropsWithRef<'label' & typeof FormHelperText>,
  'children'
> & { icons?: FC };

const TooltipLabel = forwardRef<HTMLButtonElement, Props>(
  (
    {
      onClick,
      className,
      component = 'label',
      icons: Icons = TooltipSVG,
      ...restProps
    },
    ref,
  ) => {
    const { toggleOpen, label } = useContext(tooltipContext);

    const handleClick: MouseEventHandler = (e) => {
      onClick?.(e);
      toggleOpen();
    };

    return (
      <button ref={ref} onClick={handleClick}>
        <FormHelperText
          color="neutral"
          variant="label-1"
          component={component}
          className={className}
          {...restProps}
        >
          {label}
          <Icons />
        </FormHelperText>
      </button>
    );
  },
);

TooltipLabel.displayName = 'TooltipLabel';

export { TooltipLabel };
