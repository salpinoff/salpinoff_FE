import { cva, cx, type VariantProps } from 'class-variance-authority';

import { RequiredByKeys } from '@type/util';

export type LabelProps = VariantProps<typeof label>;

const label = cva(['label-1-regular'], {
  variants: {},
});

export type FormLabelProps<T extends React.ElementType = 'label'> =
  RequiredByKeys<
    React.PropsWithChildren<LabelProps> &
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
    <label htmlFor={id} className={cx(label({}), className)} {...rest}>
      <div>
        {children}
        {required && (
          <span className="pl-4 text-[--color-text-accent-red]">*</span>
        )}
      </div>
    </label>
  );
}
