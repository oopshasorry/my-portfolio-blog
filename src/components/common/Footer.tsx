import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-cyber-bg-alt text-text-secondary py-8 mt-auto border-t border-border-medium print:hidden">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {currentYear} MyPortfolio. All rights reserved.</p>
        <p className="mt-2 text-sm">
          Built with <span className="text-neon-green">React</span> &amp;{" "}
          <span className="text-neon-purple">Tailwind CSS</span>.
        </p>
        {/* Optional: Add social media links or other footer content here */}
      </div>
    </footer>
  );
};
export default Footer;
