import {
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  createContext,
  FocusEventHandler,
} from 'react';

type SignUpContext = {
  setBtnDisabled: Dispatch<SetStateAction<boolean>>;
};

type Props = PropsWithChildren<{
  value: SignUpContext;
  onBlur?: FocusEventHandler;
  onFocus?: FocusEventHandler;
}>;

const signUpContext = createContext<SignUpContext>({
  setBtnDisabled: () => {},
});

function SignUpProvider({ value, onFocus, onBlur, children }: Props) {
  const { Provider } = signUpContext;

  return (
    <Provider value={value}>
      <div className="relative flex-1" onFocus={onFocus} onBlur={onBlur}>
        {children}
      </div>
    </Provider>
  );
}
export { SignUpProvider, signUpContext };
