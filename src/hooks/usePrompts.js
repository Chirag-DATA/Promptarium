import { useContext } from "react";
import { PromptsContext } from "../context/PromptsContext";

export const usePrompts = () => {
  const context = useContext(PromptsContext);

  if (!context) {
    throw new Error("usePrompts must be used within a PromptsProvider");
  }

  return context;
};