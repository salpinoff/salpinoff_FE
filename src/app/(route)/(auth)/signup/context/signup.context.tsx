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
      <div
        className="relative flex-1 touch-auto overflow-auto"
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {children}
        <div aria-hidden className="absolute left-0 top-0 h-[105%] w-1" />
      </div>
    </Provider>
  );
}

export { SignUpProvider, signUpContext };
