// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css"; // <<< TEMPORARILY COMMENT THIS OUT

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("FATAL ERROR: Root element with ID 'root' not found...");
}
