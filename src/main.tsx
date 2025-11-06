import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { WordStoreProvider } from "./providers/word-store-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WordStoreProvider>
      <App />
    </WordStoreProvider>
  </StrictMode>,
);
