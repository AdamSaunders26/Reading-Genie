import React, { useReducer } from "react";
import { contentLengths, contentTypes, topics } from "./topics";

export interface State {
  interests: Record<string, boolean>;
  contentTypes: Record<string, boolean>;
  contentLengths: Record<string, boolean>;
}

export type Action =
  | { type: "TOGGLE_INTEREST"; payload: string }
  | { type: "TOGGLE_CONTENT_TYPE"; payload: string }
  | { type: "TOGGLE_CONTENT_LENGTH"; payload: string };

export const topicReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "TOGGLE_INTEREST":
      return {
        ...state,
        interests: {
          ...state.interests,
          [action.payload]: !state.interests[action.payload],
        },
      };
    case "TOGGLE_CONTENT_TYPE":
      return {
        ...state,
        contentTypes: {
          ...state.contentTypes,
          [action.payload]: !state.contentTypes[action.payload],
        },
      };
    case "TOGGLE_CONTENT_LENGTH":
      return {
        ...state,
        contentLengths: {
          ...state.contentLengths,
          [action.payload]: !state.contentLengths[action.payload],
        },
      };
    default:
      return state;
  }
};

export const initialState: State = {
  interests: Object.fromEntries(
    topics.map((topic) => {
      return [topic, false];
    })
  ),
  contentTypes: Object.fromEntries(
    contentTypes.map((contentType) => {
      return [contentType, false];
    })
  ),
  contentLengths: Object.fromEntries(
    contentLengths.map((contentLength) => {
      return [contentLength.split(" ")[0], false];
    })
  ),
};
