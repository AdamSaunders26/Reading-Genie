import React, { useReducer } from "react";
import { contentLengths, contentTypes, topics } from "./topicsData";

export interface State {
  interests: Record<string, boolean>;
  contentTypes: Record<string, boolean>;
  contentLengths: Record<string, boolean>;
  parentDetails: Record<string, string>;
  childDetails: Record<string, string>;
  rewardDetails: Record<string, string>;
}

export type Action =
  | { type: "TOGGLE_INTEREST"; payload: string }
  | { type: "TOGGLE_CONTENT_TYPE"; payload: string }
  | { type: "TOGGLE_CONTENT_LENGTH"; payload: string }
  | { type: "TOGGLE_PARENT_DETAILS"; payload: string; input: string }
  | { type: "TOGGLE_CHILD_DETAILS"; payload: string; input: string }
  | { type: "TOGGLE_REWARD_DETAILS"; payload: string; input: string };

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
    case "TOGGLE_PARENT_DETAILS":
      return {
        ...state,
        parentDetails: {
          ...state.parentDetails,
          [action.payload]: action.input,
        },
      };
    case "TOGGLE_CHILD_DETAILS":
      return {
        ...state,
        childDetails: {
          ...state.childDetails,
          [action.payload]: action.input,
        },
      };
    case "TOGGLE_REWARD_DETAILS":
      return {
        ...state,
        rewardDetails: {
          ...state.rewardDetails,
          [action.payload]: action.input,
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
  parentDetails: {
    username: "",
    userEmail: "",
    userPassword: "",
  },
  childDetails: {
    childNickName: "",
    childBirthDate: "",
  },
  rewardDetails: {
    targetFrequency: "",
    rewardEmoji: "",
    rewardName: "",
  },
};

export function toggleParentDetails(
  type: string,
  details: string,
  dispatch: React.Dispatch<Action>
) {
  dispatch({ type: "TOGGLE_PARENT_DETAILS", payload: type, input: details });
}

export function toggleChildDetails(
  type: string,
  details: string,
  dispatch: React.Dispatch<Action>
) {
  dispatch({ type: "TOGGLE_CHILD_DETAILS", payload: type, input: details });
}

export function toggleInterest(
  interest: string,
  dispatch: React.Dispatch<Action>
) {
  dispatch({ type: "TOGGLE_INTEREST", payload: interest });
}

export function toggleContentType(
  contentType: string,
  dispatch: React.Dispatch<Action>
) {
  dispatch({ type: "TOGGLE_CONTENT_TYPE", payload: contentType });
}

export function toggleContentLength(
  contentLength: string,
  dispatch: React.Dispatch<Action>
) {
  dispatch({ type: "TOGGLE_CONTENT_LENGTH", payload: contentLength });
}

export function toggleRewardDetails(
  type: string,
  details: string,
  dispatch: React.Dispatch<Action>
) {
  dispatch({ type: "TOGGLE_REWARD_DETAILS", payload: type, input: details });
}
