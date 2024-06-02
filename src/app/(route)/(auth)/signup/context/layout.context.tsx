import {
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  type MouseEvent,
  createContext,
  FocusEventHandler,
} from 'react';

type Callback = (event: MouseEvent<Element>) => Promise<boolean> | void;
type SignUpContext = {
  setBtnDisabled: Dispatch<SetStateAction<boolean>>;
  registerCallback: (callback: Callback) => Promise<boolean> | void;
};

type Props = PropsWithChildren<{
  value: SignUpContext;
  onBlur?: FocusEventHandler;
  onFocus?: FocusEventHandler;
}>;

const signUpContext = createContext<SignUpContext>({
  setBtnDisabled: () => {},
  registerCallback: () => {},
});

function SignUpProvider({ value, onFocus, onBlur, children }: Props) {
  const { Provider } = signUpContext;

  return (
    <Provider value={value}>
      <div
        className="relative flex-1 overflow-auto"
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {children}
      </div>
    </Provider>
  );
}
export { SignUpProvider, signUpContext };
