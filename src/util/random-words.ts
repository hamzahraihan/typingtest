import englishWords from "../../static/words.json" with { type: "json" };

// create a random words based on words.json
class RandomWords {
  private static _instance: RandomWords;
  private static randomWords: string[] = [];
  private static words: string[] = englishWords.words;

  private constructor() {}

  public static get instance(): RandomWords {
    if (!RandomWords._instance) {
      RandomWords._instance = new RandomWords();
    }

    return RandomWords._instance;
  }

  public static get getRandomWords() {
    const s = performance.now();

    this.generateRandomWords();

    const e = performance.now();

    console.log(`randomizing words took ${e - s} milliseconds.`);
    return this.randomWords;
  }

  private static generateRandomWords() {
    // const words = [...this.words];

    const shuffled = [...this.words].sort(() => Math.random() - 0.5);
    this.randomWords = shuffled.slice(0, 10);

    // for (let i = this.words.length - 1; i > 0; i--) {
    //   const j = Math.floor(Math.random() * i + 1);
    //   [words[i], words[j]] = [words[j], words[i]];
    // }
    // this.randomWords = words.slice(0, 10);

    // for (let i = 0; i < 10; i++) {
    //   const randomizer = Math.floor(
    //     Math.random() * (this.words.length - i + 1) + i,
    //   );
    //   console.log(randomizer);
    //   this.randomWords.push(this.words[randomizer]);
    // }
  }
}

const random = RandomWords.getRandomWords;
console.log(random);

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
