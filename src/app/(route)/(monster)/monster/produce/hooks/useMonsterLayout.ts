import { useContext } from 'react';

import { monsterLayoutContext } from '../context/layout.context';

const useMonsterLayout = () => {
  const layouHandler = useContext(monsterLayoutContext);

  if (!layouHandler) {
    throw new Error(
      'Context MisMatch : this hook must be under SignUpContext.Provider',
    );
  }

  const { setBtnDisabled: makeBtnDisabled, registerCallback } = layouHandler;

  const setBtnDisabled = (disable: boolean) => {
    makeBtnDisabled(disable);
  };

  return {
    setBtnDisabled,
    registerCallback,
  };
};

export default useMonsterLayout;
