import React from "react";
import { Link } from "react-router-dom"; 

const Navbar = () => {

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          Home
        </Link>
        <Link to="/favorites" className="navbar-item">
          Favorites
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
