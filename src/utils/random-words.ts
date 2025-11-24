import easy from "../../static/english/easy.json" with { type: "json" };
import medium from "../../static/english/medium.json" with { type: "json" };
import hard from "../../static/english/hard.json" with { type: "json" };
import type { Difficulty } from "./difficulty.ts";

// create a random words based on words.json
export class RandomWords {
  private static _instance: RandomWords | null = null;
  private static randomWords: string[] = [];
  private static difficulty: Difficulty = "EASY";

  private constructor() {}

  public static get instance(): RandomWords {
    if (!this._instance) {
      this._instance = new RandomWords();
    }

    return this._instance;
  }

  public static setDifficulty(difficulty: Difficulty = "EASY") {
    this.difficulty = difficulty;
    console.log(this.difficulty);
    return this;
  }

  public static getRandomWords(totalWords: number): string[] {
    const s = performance.now();

    const map = {
      EASY: easy.words,
      MEDIUM: medium.words,
      HARD: hard.words,
    };

    const words = map[this.getDifficulty()];
    const result = this.generateRandomWords(words, totalWords);

    const e = performance.now();
    console.log(`randomizing words took ${e - s} ms.`);

    return result;
  }

  private static getDifficulty() {
    return this.difficulty;
  }

  private static generateRandomWords(words: string[], totalWords: number) {
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    this.randomWords = shuffled.slice(0, totalWords);
    return this.randomWords;
  }
}

// const random = RandomWords.getRandomWords;
// console.log(random);

// function randomWords() {
//   const words = englishWords.words;
//   const wordsRandom: string[] = [];
//
//   for (let i = 0; i < 10; i++) {
//     const randomizer = Math.floor(Math.random() * (words.length - i + 1) + i);
//     console.log(randomizer);
//     wordsRandom.push(words[randomizer]);
//   }
//   console.log("performance from function: ", performance.now());
//   console.log(wordsRandom);
// }
//
// randomWords();
