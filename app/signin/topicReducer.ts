import React, { useReducer } from "react";

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
  interests: {
    Football: false,
    Science: false,
    Magic: false,
    "Make-up": false,
    Minecraft: false,
    "Art & Craft": false,
    Dinosaurs: false,
    Pirates: false,
    Animals: false,
  },
  contentTypes: {
    facts: false,
    riddles: false,
    jokes: false,
    spells: false,
  },
  contentLengths: {
    short: false,
    medium: false,
    spells: false,
  },
};
