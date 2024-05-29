import { Children, isValidElement, useState } from 'react';

const useFunnel = <
  T extends string,
  U extends {
    name: T;
    children?: React.ReactNode;
  },
>(
  defaultStep: T,
) => {
  const [step, setStep] = useState(defaultStep);

  function Funnel({ children }: Pick<U, 'children'>) {
    return Children.toArray(children)
      .filter(isValidElement<U>)
      .find((child) => child.props.name === step);
  }

  function Step({ children }: U) {
    return children;
  }

  Funnel.Step = Step;

  return { Funnel, setStep, step };
};

export default useFunnel;
