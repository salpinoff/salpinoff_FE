import {
  ComponentPropsWithRef,
  MouseEventHandler,
  forwardRef,
  useContext,
} from 'react';

import Icon, { IconProps } from '@components/common/Icon';

import { tooltipContext } from './TooltipProvider';
import FormHelperText from '../TextField/FormHelperText';

type Props = Omit<
  ComponentPropsWithRef<'label' & typeof FormHelperText>,
  'children'
> & { icons?: IconProps['name'] };

const TooltipLabel = forwardRef<HTMLButtonElement, Props>(
  (
    {
      onClick,
      className,
      component = 'label',
      icons = 'information',
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
      <button onClick={handleClick}>
        <FormHelperText
          color="neutral"
          variant="label-1"
          component={component}
          className={className}
          {...restProps}
        >
          {label}
          <Icon name={icons} ref={ref} />
        </FormHelperText>
      </button>
    );
  },
);

TooltipLabel.displayName = 'TooltipLabel';

export { TooltipLabel };
