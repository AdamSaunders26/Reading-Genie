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
}

export const genieContext = createContext<GenieContextType>({
  selected: null,
  dispatch: null,
});

export function GenieProvider({ children }: { children: ReactNode }) {
  const [selected, dispatch] = useReducer(topicReducer, initialState);
  console.log(selected);
  return (
    <genieContext.Provider value={{ selected, dispatch }}>
      {children}
    </genieContext.Provider>
  );
}
