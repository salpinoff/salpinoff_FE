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
    const targetStep = Children.toArray(children)
      .filter(isValidElement<U>)
      .find((child) => child.props.name === step);

    if (!targetStep) {
      console.error(`"${step}" 스텝 컴포넌트를 찾지 못했습니다.`);
    }

    return targetStep;
  }

  function Step({ children }: U) {
    return children;
  }

  Funnel.Step = Step;

  return { Funnel, setStep, step };
};

export default useFunnel;
