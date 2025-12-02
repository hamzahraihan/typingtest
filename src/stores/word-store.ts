import { createStore } from "zustand";
import type { Difficulty } from "../utils/difficulty.ts";

export type WordState = {
  randomWords: string[];
  inputWord: string;
  currentWordIndex: number;
  typedWords: string[];
  result: {
    wpm: number;
    raw: number;
    acc: number;
  };
  difficulty: Difficulty;
  state: "IDLE" | "PLAYING" | "FINISHED";
};

export type WordActions = {
  setRandomWords: (words: WordState["randomWords"]) => void;
  setInputWord: (inputWord: WordState["inputWord"]) => void;
  setTypedWords: (
    updater: WordState["typedWords"] | ((prev: string[]) => string[]),
  ) => void;
  setCurrentWordIndex: (index: WordState["currentWordIndex"]) => void;
  setResult: (number: WordState["result"]) => void;
  setDifficulty: (diff: WordState["difficulty"]) => void;
  setState: (diff: WordState["state"]) => void;
};

export type WordStore = WordState & WordActions;

export const defaultInitState: WordState = {
  randomWords: [],
  inputWord: "",
  currentWordIndex: 0,
  typedWords: [],
  result: {
    wpm: 0,
    raw: 0,
    acc: 0,
  },
  difficulty: "EASY",
  state: "IDLE",
};

export const createWordStore = (initState: WordState = defaultInitState) => {
  return createStore<WordStore>()((set, get) => ({
    ...initState,
    setRandomWords: (words) => set(() => ({ randomWords: words })),

    setInputWord: (inputWord) => set(() => ({ inputWord: inputWord })),

    setTypedWords: (updater) => {
      const prev = get().typedWords;
      const newTypedWords =
        typeof updater === "function" ? updater(prev) : updater;
      set({ typedWords: newTypedWords });
    },

    setCurrentWordIndex: (currentIndex) =>
      set(() => ({ currentWordIndex: currentIndex })),

    setResult: ({ wpm, raw, acc }) =>
      set({ result: { wpm: wpm, raw: raw, acc: acc } }),

    setDifficulty: (diff) => set({ difficulty: diff }),

    setState: (state) => set({ state: state }),
  }));
};
