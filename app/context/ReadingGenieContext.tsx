"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  Action,
  State,
  initialState,
  topicReducer,
} from "../signin/topicReducer";
import { responseFormatter } from "../utils";

export interface GenieContextType {
  selected: State | null;
  dispatch: React.Dispatch<Action> | null;
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  newResponse: boolean;
  setNewResponse: React.Dispatch<React.SetStateAction<boolean>>;
  currentMessage: (string | (() => void) | number)[] | null;
  setCurrentMessage: React.Dispatch<
    React.SetStateAction<(string | number | (() => void))[] | null>
  >;
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
  visibleLike: boolean;
  setVisibleLike: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  messageFormatter: (message: string) => (string | number | (() => void))[];
  byteBatch: any;
  setByteBatch: React.Dispatch<React.SetStateAction<any>>;
  byteCount: number;
  setByteCount: React.Dispatch<React.SetStateAction<number>>;
}

export const genieContext = createContext<GenieContextType>({
  selected: null,
  dispatch: null,
  userId: null,
  setUserId: () => null,
  newResponse: false,
  setNewResponse: () => null,
  currentMessage: null,
  setCurrentMessage: () => null,
  contentRef: { current: null },
  visibleLike: false,
  setVisibleLike: () => null,
  loading: false,
  setLoading: () => null,
  messageFormatter: () => [],
  byteBatch: null,
  setByteBatch: () => null,
  byteCount: 0,
  setByteCount: () => null,
});

export function GenieProvider({ children }: { children: ReactNode }) {
  const [selected, dispatch] = useReducer(topicReducer, initialState);
  const [userId, setUserId] = useState<string | null>(null);
  const [newResponse, setNewResponse] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<
    (string | (() => void) | number)[] | null
  >(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [visibleLike, setVisibleLike] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [byteBatch, setByteBatch] = useState<any>(null);
  const [byteCount, setByteCount] = useState<number>(0);

  // console.log(byteCount);

  function messageFormatter(message: string) {
    return responseFormatter(message, contentRef, setVisibleLike, setLoading);
  }

  // console.log(selected);
  return (
    <genieContext.Provider
      value={{
        selected,
        dispatch,
        userId,
        setUserId,
        newResponse,
        setNewResponse,
        currentMessage,
        setCurrentMessage,
        contentRef,
        visibleLike,
        setVisibleLike,
        loading,
        setLoading,
        messageFormatter,
        byteBatch,
        setByteBatch,
        byteCount,
        setByteCount,
      }}
    >
      {children}
    </genieContext.Provider>
  );
}
