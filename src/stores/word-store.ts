import { createStore } from "zustand";

export type WordState = {
  inputWord: string;
  currentWordIndex: number;
  typedWords: string[];
};

export type WordActions = {
  setInputWord: (inputWord: WordState["inputWord"]) => void;
  setTypedWords: (
    updater: WordState["typedWords"] | ((prev: string[]) => string[]),
  ) => void;
  setCurrentWordIndex: (index: WordState["currentWordIndex"]) => void;
};

export type WordStore = WordState & WordActions;

export const defaultInitState: WordState = {
  inputWord: "",
  currentWordIndex: 0,
  typedWords: [],
};

export const createWordStore = (initState: WordState = defaultInitState) => {
  return createStore<WordStore>()((set, get) => ({
    ...initState,
    setInputWord: (inputWord) => set(() => ({ inputWord: inputWord })),

    setTypedWords: (updater) => {
      const prev = get().typedWords;
      const newTypedWords =
        typeof updater === "function" ? updater(prev) : updater;
      set({ typedWords: newTypedWords });
    },

    setCurrentWordIndex: (currentIndex) =>
      set(() => ({ currentWordIndex: currentIndex })),
  }));
};
