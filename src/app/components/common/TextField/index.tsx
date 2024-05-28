'use client';

import { forwardRef } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import FormLabel from '@components/common/FormLabel';

import { RequiredByKeys } from '@type/util';

import FormHelperText from './FormHelperText';

// Container Styles
const inputBoxStyles = cva(
  [
    'inline-flex',
    'flex-col',
    'gap-12',
    'text-[--color-base-cool-neutral-80-a]',
  ],
  {
    variants: {
      fullWidth: {
        true: ['flex', 'w-full'],
      },
    },
    defaultVariants: {
      fullWidth: false,
    },
  },
);

// Input || Textarea Styles
const inputStyles = cva(
  [
    'w-full',
    'px-16',
    'py-12',
    'body-2-regular',
    'rounded-12',
    'bg-[#70737C38]',
    'outline-none',
  ],
  {
    variants: {
      variant: {
        outlined: ['border border-[#70737C52]', 'focus:border-transparent'],
      },
      error: {
        true: 'text-[--color-text-danger]',
      },
      disabled: {
        true: 'text-[--color-text-accent-gray]',
        false: 'text-[--color-text-label-normal]',
      },
      multiline: {
        true: 'resize-none overflow-y-scroll',
      },
    },
    compoundVariants: [],
    defaultVariants: {
      variant: 'outlined',
    },
  },
);

type CommonStyleProps = VariantProps<typeof inputStyles> &
  VariantProps<typeof inputBoxStyles>;

type CustomTextFieldProps = {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  multiline?: boolean;
  focus?: boolean;
  error?: boolean;
};

type TextFieldProps<T extends React.ElementType> = RequiredByKeys<
  CommonStyleProps & CustomTextFieldProps & React.ComponentPropsWithRef<T>,
  'id'
>;

type TextFieldComponent = <T extends React.ElementType = 'input'>(
  props: TextFieldProps<T> & {
    ref?: React.ComponentPropsWithRef<T>['ref'];
  },
) => React.ReactNode | null;

const TextField: TextFieldComponent = forwardRef(function TextField<
  T extends React.ElementType,
>(
  {
    id,
    variant,
    className,
    label,
    helperText,
    multiline,
    error,
    required,
    disabled = false,
    fullWidth,
    ...rest
  }: TextFieldProps<T>,
  ref: React.ComponentPropsWithRef<T>['ref'],
) {
  const Component: React.ElementType = multiline ? 'textarea' : 'input';

  return (
    <div className={inputBoxStyles({ fullWidth })}>
      {label && (
        <FormLabel id={id} required={required}>
          {label}
        </FormLabel>
      )}
      <div>
        <Component
          ref={ref}
          id={id}
          className={inputStyles({
            variant,
            className,
            disabled,
            multiline,
          })}
          required={required}
          disabled={disabled}
          {...rest}
        />
      </div>
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </div>
  );
});

export default TextField;
