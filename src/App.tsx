// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./components/layout/MainLayout"; // Import MainLayout
import HomePage from "./pages/HomePage"; // Import HomePage
import BlogPage from "./pages/BlogPage"; // Import BlogPage
import BlogPostPage from "./pages/BlogPostPage"; // Import BlogPostPage
// import SimpleTestPage from "./pages/SimpleTestPage"; // Can be removed or kept for other tests

const appBaseName = import.meta.env.BASE_URL;

const App: React.FC = () => {
  return (
    <BrowserRouter basename={appBaseName}>
      <Routes>
        {/* MainLayout will render for all child routes defined within it */}
        <Route path="/" element={<MainLayout />}>
          {/* HomePage is now the default page for the "/" path */}
          <Route index element={<HomePage />} />
          <Route
            path="another" // Kept for testing, navigates to /another
            element={
              <div className="p-5 bg-cyber-bg-alt border-2 border-neon-orange rounded-md">
                <h1 className="text-2xl text-neon-green">
                  Another Test Page (Inside Layout)
                </h1>
                <p className="text-text-secondary mt-2">
                  This page also uses the MainLayout.
                </p>
              </div>
            }
          />
          {/* Add other routes like /blog, /projects, /resume here as children of MainLayout */}
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
