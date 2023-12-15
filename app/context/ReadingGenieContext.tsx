"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";
import {
  Action,
  State,
  initialState,
  topicReducer,
} from "../signin/topicReducer";

export interface GenieContextType {
  selected: State | null;
  dispatch: React.Dispatch<Action> | null;
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const genieContext = createContext<GenieContextType>({
  selected: null,
  dispatch: null,
  userId: null,
  setUserId: () => null,
});

export function GenieProvider({ children }: { children: ReactNode }) {
  const [selected, dispatch] = useReducer(topicReducer, initialState);
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <genieContext.Provider value={{ selected, dispatch, userId, setUserId }}>
      {children}
    </genieContext.Provider>
  );
}
