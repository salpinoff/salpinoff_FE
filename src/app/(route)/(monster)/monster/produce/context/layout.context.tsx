import {
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  type MouseEvent,
  createContext,
  FocusEventHandler,
} from 'react';

type Callback = (event: MouseEvent<Element>) => Promise<boolean> | void;
type MonsterLayout = {
  setBtnDisabled: Dispatch<SetStateAction<boolean>>;
  registerCallback: (callback: Callback) => Promise<boolean> | void;
};

type Props = PropsWithChildren<{
  value: MonsterLayout;
  onBlur?: FocusEventHandler;
  onFocus?: FocusEventHandler;
}>;

const monsterLayoutContext = createContext<MonsterLayout>({
  setBtnDisabled: () => {},
  registerCallback: () => {},
});

function MonsterLayoutProvider({ value, onFocus, onBlur, children }: Props) {
  const { Provider } = monsterLayoutContext;

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

export { MonsterLayoutProvider, monsterLayoutContext };
