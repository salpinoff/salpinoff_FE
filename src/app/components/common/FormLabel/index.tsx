import { cva, type VariantProps } from 'class-variance-authority';

import cn from '@utils/cn';

export const labelVariants = cva('label-1-regular', {
  variants: {
    required: {
      true: 'after:content-["*"] after:text-[--color-text-accent-red] after:pl-4',
    },
  },
});

export interface FormLabelProps
  extends React.ComponentPropsWithoutRef<'label'>,
    VariantProps<typeof labelVariants> {}

export default function FormLabel({
  className,
  children,
  htmlFor,
  required,
  ...rest
}: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(labelVariants({ required }), className)}
      {...rest}
    >
      {children}
    </label>
  );
}
