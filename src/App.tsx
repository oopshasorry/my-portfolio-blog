// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout"; // Import MainLayout
import SimpleTestPage from "./pages/SimpleTestPage"; // Keep SimpleTestPage for now

const appBaseName = import.meta.env.BASE_URL;

const App: React.FC = () => {
  return (
    <BrowserRouter basename={appBaseName}>
      <div style={{ border: "2px solid red", padding: "10px", margin: "10px" }}>
        {" "}
        {/* Wrapper to see App.tsx boundary */}
        <h1 style={{ color: "red" }}>Inside App.tsx - Before Routes</h1>
        <Routes>
          {/* Define a layout route. MainLayout will render, and its Outlet will render child elements. */}
          <Route path="/" element={<MainLayout />}>
            {/* 'index' makes SimpleTestPage the default child for the '/' path of MainLayout */}
            <Route index element={<SimpleTestPage />} />
            <Route
              path="another"
              element={
                // Test another page within the layout
                <div
                  style={{
                    padding: "20px",
                    backgroundColor: "lightyellow",
                    border: "2px solid orange",
                  }}
                >
                  <h1>Another Test Page (Inside Layout)</h1>
                </div>
              }
            />
          </Route>
        </Routes>
        <h1 style={{ color: "red" }}>Inside App.tsx - After Routes</h1>
      </div>
    </BrowserRouter>
  );
};
export default App;
