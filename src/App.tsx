import { useRef } from "react";
import "./App.css";
import { TypingTest } from "./components/typing-test.tsx";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="flex justify-center  bg-gray-100">
      <div className="antialiased grid grid-row-6 p-5 min-h-screen max-w-screen-lg">
        <div>header</div>
        <div className="row-span-6 self-center">
          <TypingTest inputRef={inputRef} />
        </div>
        <footer>footer</footer>
      </div>
    </section>
  );
}

export default App;
