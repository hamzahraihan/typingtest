import { createContext, useContext } from "react";
import { type WordStoreApi } from "../providers/word-store-provider.tsx";
import { useStore } from "zustand";
import type { WordStore } from "../stores/word-store.ts";

export const WordStoreContext = createContext<WordStoreApi | undefined>(
  undefined,
);

export const useWordContext = <T>(selector: (store: WordStore) => T): T => {
  const wordStoreContext = useContext(WordStoreContext);

  if (!wordStoreContext) {
    throw new Error(`useWordContext must be used within WordStoreProvider`);
  }
  return useStore(wordStoreContext, selector);
};
