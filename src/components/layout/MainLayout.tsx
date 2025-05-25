// src/components/layout/MainLayout.tsx
import React from "react";
import { Outlet } from "react-router";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
// import { ScrollRestoration } from "react-router/dom"; // Optional for v7

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-cyber-dark text-text-primary selection:bg-neon-purple selection:text-accent-white">
      {/* <ScrollRestoration getKey={(location) => location.pathname} /> */}
      <Navbar />
      <main className="flex-grow container mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {" "}
        {/* Reduced vertical padding */}
        <Outlet /> {/* Child routes will render here */}
      </main>
      <Footer />
    </div>
  );
};
export default MainLayout;
