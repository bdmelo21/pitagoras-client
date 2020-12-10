import React from "react";
import { NavLink } from "react-router-dom";
//import LogoPitagoras from "../assets/logoPitagoras.svg";<LogoPitagoras />

function Layout() {
  return (
    <div>
      <nav>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/news">News</NavLink>
        <NavLink to="/help">Help</NavLink>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/teacherinfo">I'm a Teacher</NavLink>
      </nav>
      <div className="layoutpage-firstSection">
        <h1 className="layoutpage-h1">A New Experience of Education </h1>
        <h2 className="layoutpage-h2">
          + than 1.000.000 professionals ready to help you
        </h2>
      </div>
    </div>
  );
}

export default Layout;
