import { cva, type VariantProps } from 'class-variance-authority';

import cn from '@utils/cn';

import { RequiredByKeys } from '@type/util';

const labelStyle = cva(['label-1-regular'], {
  variants: {
    required: {
      true: [
        'after:content-["*"]',
        'after:text-[--color-text-accent-red]',
        'after:pl-4',
      ],
    },
  },
});

export type FormLabelProps<T extends React.ElementType> = RequiredByKeys<
  React.PropsWithChildren<VariantProps<typeof labelStyle>> &
    React.ComponentPropsWithoutRef<T> & {
      required?: boolean;
    },
  'id' | 'children'
>;

export default function FormLabel<T extends React.ElementType = 'label'>({
  id,
  className,
  children,
  required,
  ...rest
}: FormLabelProps<T>) {
  return (
    <label
      htmlFor={id}
      className={cn(labelStyle({ required }), className)}
      {...rest}
    >
      {children}
    </label>
  );
}
