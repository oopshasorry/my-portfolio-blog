// src/main.tsx
import { StrictMode } from "react"; // Correct import for StrictMode
import { createRoot } from "react-dom/client"; // Correct import for createRoot
import App from "./App.tsx";
import "./index.css"; // Your global styles and Tailwind CSS

// Get the root DOM element
const rootElement = document.getElementById("root");

// Ensure the root element exists before trying to render into it
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error(
    "Failed to find the root element. Ensure an element with ID 'root' exists in your index.html."
  );
}
