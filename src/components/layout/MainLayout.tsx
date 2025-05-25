import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../common/Navbar"; // Will import the ultra-simple Navbar
import Footer from "../common/Footer"; // Will import the ultra-simple Footer

const MainLayout: React.FC = () => {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ border: "2px solid purple", padding: "5px" }}
    >
      {" "}
      {/* Added border for MainLayout visibility */}
      <h2 style={{ color: "purple", textAlign: "center" }}>
        Inside MainLayout.tsx - Start
      </h2>
      <ScrollRestoration getKey={(location) => location.pathname} />
      <Navbar />
      <main
        className="flex-grow container mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8 md:py-12"
        style={{
          border: "2px dashed green",
          padding: "10px",
          minHeight: "50vh",
        }}
      >
        {" "}
        {/* Added border for main content area */}
        <h3 style={{ color: "green", textAlign: "center" }}>
          Inside main (Outlet area) - Start
        </h3>
        <Outlet />{" "}
        {/* This is where SimpleTestPage or other child routes will render */}
        <h3 style={{ color: "green", textAlign: "center" }}>
          Inside main (Outlet area) - End
        </h3>
      </main>
      <Footer />
      <h2 style={{ color: "purple", textAlign: "center" }}>
        Inside MainLayout.tsx - End
      </h2>
    </div>
  );
};
export default MainLayout;
