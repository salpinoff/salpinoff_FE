/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useReducer,
} from 'react';

type GuestState = {
  clear: boolean;
};

type GuestAction = { payload: Partial<GuestState> };

const initialState: GuestState = {
  clear: false,
};

const reducer = (state: GuestState, action: GuestAction): GuestState => {
  return { ...state, ...action.payload };
};

export const GuestContext = createContext<GuestState>(initialState);

export const GuestDispatchContext = createContext({
  update: (payload: Partial<GuestState>) => {},
});

export function GuestProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const update = useCallback(
    (payload: Partial<GuestState>) => {
      return dispatch({
        payload,
      });
    },
    [dispatch],
  );

  const memoizedValue = useMemo(() => ({ update }), [update]);

  return (
    <GuestContext.Provider value={state}>
      <GuestDispatchContext.Provider value={memoizedValue}>
        {children}
      </GuestDispatchContext.Provider>
    </GuestContext.Provider>
  );
}
