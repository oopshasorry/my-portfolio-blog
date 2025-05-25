import React from "react";
import { Link } from "react-router-dom"; // Keep Link for basic navigation testing

const Navbar: React.FC = () => (
  <nav
    style={{
      padding: "10px",
      background: "#e0e0e0",
      borderBottom: "1px solid #c0c0c0",
    }}
  >
    <span style={{ fontWeight: "bold", marginRight: "20px" }}>NAVBAR</span>
    <Link to="/" style={{ marginRight: "10px" }}>
      Home (SimpleTestPage)
    </Link>
    <Link to="/another">Another Page</Link>
  </nav>
);
export default Navbar;
