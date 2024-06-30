import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <ul className="links" style={navStyles}>
        <Link to="/register" style={linkStyles}>
          <li style={listItemStyles}>Register</li>
        </Link>

        <Link to="/login" style={linkStyles}>
          <li style={listItemStyles}>Login</li>
        </Link>
      </ul>
    </div>
  );
};

// Styles
const navStyles = {
  position: "absolute",
  top: "10px",
  right: "10px",
};

const linkStyles = {
  textDecoration: "none",
};

const listItemStyles = {
  display: "inline-block",
  padding: "8px 16px",
  margin:"10px",
  border:"none",
  backgroundColor:"slateblue",
  borderRadius: "4px",
  color: "white",
  listStyleType: "none",
};

export default Nav;
