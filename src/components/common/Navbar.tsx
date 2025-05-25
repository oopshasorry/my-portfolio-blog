import React from "react";
import { Link } from "react-router";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-cyber-bg-alt shadow-lg sticky top-0 z-50 print:hidden">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-neon-green hover:text-neon-purple transition-colors duration-300 ease-in-out"
        >
          MyPortfolio
        </Link>
        <div className="space-x-6">
          <Link
            to="/"
            className="text-text-primary hover:text-neon-green transition-colors duration-300 ease-in-out"
          >
            Home
          </Link>
          {/* Add links to other pages like Blog, Projects, Resume as they are created */}
          <Link
            to="/blog"
            className="text-text-primary hover:text-neon-green transition-colors duration-300 ease-in-out"
          >
            Blog
          </Link>
          <Link
            to="/projects"
            className="text-text-primary hover:text-neon-green transition-colors duration-300 ease-in-out"
          >
            Projects (soon)
          </Link>
          <Link
            to="/resume"
            className="text-text-primary hover:text-neon-green transition-colors duration-300 ease-in-out"
          >
            Resume (soon)
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
