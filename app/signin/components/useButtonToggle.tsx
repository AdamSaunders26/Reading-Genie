import { useState } from "react";

export default function useButtonToggle(initialState: boolean) {
  const [clicked, setClicked] = useState(initialState);
  return { clicked, setClicked };
}
