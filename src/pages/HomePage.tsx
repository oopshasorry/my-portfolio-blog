// src/pages/HomePage.tsx
import React from "react";
import catImageUrl from "../assets/home-image-temp.png";
// MainLayout will wrap this component via the router configuration

const HomePage: React.FC = () => {
  return (
    <div className="text-center py-8 sm:py-10">
      {" "}
      {/* Reduced overall vertical padding */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-neon-green mb-4 animate-pulse">
        {" "}
        {/* Reduced margin-bottom */}
        Welcome to the Cyber Grid! TEST
      </h1>
      <p className="text-lg sm:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
        {" "}
        {/* Reduced margin-bottom */}
        This is a placeholder for the future portfolio &amp; blog. Stay tuned
        for updates from the digital frontier.
      </p>
      <div className="max-w-xs lg:max-w-sm mx-auto bg-cyber-bg-alt p-3 sm:p-4 rounded-lg shadow-neon-glow-purple">
        <img
          src={catImageUrl} // Placeholder cat image
          alt="A placeholder kitten, guardian of this temporary page"
          className="rounded-md w-full h-auto object-cover border-2 border-neon-purple"
        />
        <p className="text-xs sm:text-sm text-text-secondary mt-3 italic">
          Our current feline sentinel.
        </p>
      </div>
    </div>
  );
};
export default HomePage;
