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
  newResponse: boolean;
  setNewResponse: React.Dispatch<React.SetStateAction<boolean>>;
}

export const genieContext = createContext<GenieContextType>({
  selected: null,
  dispatch: null,
  userId: null,
  setUserId: () => null,
  newResponse: false,
  setNewResponse: () => null,
});

export function GenieProvider({ children }: { children: ReactNode }) {
  const [selected, dispatch] = useReducer(topicReducer, initialState);
  const [userId, setUserId] = useState<string | null>(null);
  const [newResponse, setNewResponse] = useState(false);
  console.log(selected);
  return (
    <genieContext.Provider
      value={{
        selected,
        dispatch,
        userId,
        setUserId,
        newResponse,
        setNewResponse,
      }}
    >
      {children}
    </genieContext.Provider>
  );
}
