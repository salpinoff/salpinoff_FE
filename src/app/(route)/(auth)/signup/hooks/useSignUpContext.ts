import { useContext } from 'react';

import { signUpContext } from 'src/app/(route)/(auth)/signup/context/signup.context';

const useSignUpContext = () => {
  const signUpHandler = useContext(signUpContext);

  if (!signUpHandler) {
    throw new Error(
      'Context MisMatch : this hook must be under SignUpContext.Provider',
    );
  }

  const { setBtnDisabled: makeBtnDisabled } = signUpHandler;

  const setBtnDisabled = (disable: boolean) => {
    makeBtnDisabled(disable);
  };

  return {
    setBtnDisabled,
  };
};

export default useSignUpContext;
