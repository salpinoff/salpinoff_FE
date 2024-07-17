import { useContext } from 'react';

import { monsterProduceContext } from 'src/app/(route)/(monster)/monster/produce/context/layout.context';

const useSignUpContext = () => {
  const signUpHandler = useContext(monsterProduceContext);

  if (!signUpHandler) {
    throw new Error(
      'Context MisMatch : this hook must be under SignUpContext.Provider',
    );
  }

  const { setBtnDisabled: makeBtnDisabled, registerCallback } = signUpHandler;

  const setBtnDisabled = (disable: boolean) => {
    makeBtnDisabled(disable);
  };

  return {
    setBtnDisabled,
    registerCallback,
  };
};

export default useSignUpContext;
