import React, {
  createContext,
  Dispatch,
  ReactNode,
  useReducer,
} from 'react';
import tourReducer from './tour.reducer';
import Tour from '../../components/General/Tour/Tour';
import TourActions from './tour.actions';

export const TourDispatchContext = createContext<Dispatch<any> | null>(null);
export const TourStateContext = createContext<{ open: boolean }>({ open: false });

const initialState: { open: boolean } = { open: false };

export interface TourProviderProps {
  children: ReactNode,
}

export default function TourProvider({
  children,
}: TourProviderProps) {
  const [state, dispatch] = useReducer(tourReducer, initialState);

  return (
    <TourDispatchContext.Provider value={dispatch}>
      <TourStateContext.Provider value={state}>
        {children}
        {state.open && (
          <Tour onClose={() => dispatch({ type: TourActions.Close })} />
        )}
      </TourStateContext.Provider>
    </TourDispatchContext.Provider>
  );
}
