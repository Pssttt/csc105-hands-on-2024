import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/fav">Favourites</NavLink>
      </nav>
    </>
  );
};

export default Navbar;
