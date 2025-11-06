import { useRef, type ReactNode } from "react";
import { createWordStore } from "../stores/word-store.ts";
import { WordStoreContext } from "../context/word-store-context.ts";

export type WordStoreApi = ReturnType<typeof createWordStore>;

export interface WordStoreProviderProps {
  children: ReactNode;
}

export const WordStoreProvider = ({ children }: WordStoreProviderProps) => {
  const storeRef = useRef<WordStoreApi | null>(null);
  if (storeRef.current == null) {
    storeRef.current = createWordStore();
  }

  return (
    <WordStoreContext.Provider value={storeRef.current}>
      {children}
    </WordStoreContext.Provider>
  );
};
