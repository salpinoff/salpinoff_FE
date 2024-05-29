/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/jsx-no-useless-fragment */
import {
  Children,
  PropsWithChildren,
  ReactElement,
  isValidElement,
  useState,
} from 'react';

import { funnel } from '../(route)/(auth)/signup/constant/funnel';

type StepKey = (typeof funnel)[number];
type StepProps = PropsWithChildren<{ name: StepKey }>;
type FunnelProps = {
  children: ReactElement<StepProps> | ReactElement<StepProps>[];
};

const useFunnel = (defaultStep: StepKey) => {
  const [step, setStep] = useState(defaultStep);

  function Funnel({ children }: FunnelProps): ReactElement {
    const targetStep = Children.toArray(children)
      .filter(isValidElement<StepProps>)
      .find((child) => child.props.name === step);

    return <>{targetStep}</>;
  }

  function Step({ children }: StepProps): ReactElement {
    return <>{children}</>;
  }

  Funnel.Step = Step;

  return { Funnel, setStep, step };
};

export default useFunnel;
