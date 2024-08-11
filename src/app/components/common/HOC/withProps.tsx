import React from 'react';

export default function withProps<T, P>(
  Component: React.ComponentType<P>,
  addedProps: Partial<P>,
  displayName?: string,
) {
  const WithPropsComponent = React.forwardRef<T, P>((props, ref) => {
    return <Component ref={ref} {...addedProps} {...props} />;
  });

  WithPropsComponent.displayName =
    displayName ||
    `withProps(${Component.displayName || Component.name || 'Component'})`;

  return WithPropsComponent;
}
