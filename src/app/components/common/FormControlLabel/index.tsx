'use client';

import React, { forwardRef } from 'react';

import { RequiredByKeys } from '@type/util';

export type FormControlLabelProps<T extends React.ElementType = 'label'> =
  RequiredByKeys<
    React.ComponentPropsWithoutRef<T> &
      React.ComponentPropsWithRef<'input'> & {
        label: React.ReactNode;
        control: React.ReactElement<HTMLInputElement>;
      },
    'id'
  >;

type FormControlLabelComponent = <T extends React.ElementType = 'label'>(
  props: FormControlLabelProps<T> & {
    ref?: React.ComponentPropsWithRef<T>['ref'];
  },
) => React.ReactNode | null;

const FormControlLabel: FormControlLabelComponent = forwardRef(
  function FormControlLabel<T extends React.ElementType = 'label'>(
    {
      id,
      className,
      label,
      name,
      value,
      control,
      checked,
      disabled,
      required,
      onChange,
      ...rest
    }: FormControlLabelProps<T>,
    ref: React.ComponentPropsWithRef<T>['ref'],
  ) {
    const controlProps = {
      ...(id !== undefined && { id }),
      ...(name !== undefined && { name }),
      ...(value !== undefined && { value }),
      ...(checked !== undefined && { checked }),
      ...(disabled !== undefined && { disabled }),
      ...(required !== undefined && { required }),
      ...(onChange !== undefined && { onChange }),
    };

    return (
      <label htmlFor={id} className={className} ref={ref} {...rest}>
        {React.cloneElement(control, controlProps)}
        {label}
      </label>
    );
  },
);

export default FormControlLabel;
