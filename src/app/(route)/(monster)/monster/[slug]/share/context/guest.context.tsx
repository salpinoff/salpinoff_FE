/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type GuestState = {
  clear: boolean;
};

const initialState: GuestState = {
  clear: false,
};

export const GuestContext = createContext<GuestState>(initialState);

type GuestUpdateContextType = {
  update: (payload: Partial<GuestState>) => void;
};

export const GuestUpdateContext = createContext<
  GuestUpdateContextType | undefined
>(undefined);

export default function GuestProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState(initialState);

  const update = useCallback((payload: Partial<GuestState>) => {
    setState((prevState) => ({ ...prevState, ...payload }));
  }, []);

  const memoizedStateValue = useMemo(() => state, [state]);
  const memoizedUpdateValue = useMemo(() => ({ update }), [update]);

  return (
    <GuestContext.Provider value={memoizedStateValue}>
      <GuestUpdateContext.Provider value={memoizedUpdateValue}>
        {children}
      </GuestUpdateContext.Provider>
    </GuestContext.Provider>
  );
}

export const useGuestContext = () => {
  return useContext(GuestContext);
};

export const useGuestUpdate = () => {
  const context = useContext(GuestUpdateContext);

  if (!context) {
    throw new Error('useGuestUpdate must be used within a GuestProvider');
  }
  return context.update;
};
