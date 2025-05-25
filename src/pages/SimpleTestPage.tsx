// src/pages/SimpleTestPage.tsx
import React from "react";

const SimpleTestPage: React.FC = () => {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "lightgreen",
        border: "2px solid green",
      }}
    >
      <h1>Hello from SimpleTestPage!</h1>
      <p>This page is rendered by React Router.</p>
    </div>
  );
};
export default SimpleTestPage;
