import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";

function Header() {
  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userID");
  };

  const [darkMode, setDarkMode] = useDarkMode();
  console.log("Your mode is dark: ", darkMode);

  const toggleMode = (e) => {
    e.preventDefault();
    setDarkMode(!darkMode);
  };

  return (
    <div className="header-container">
      <div className="dark-mode__toggle">
        <div
          onClick={toggleMode}
          className={darkMode ? "toggle toggled" : "toggle"}
        />
      </div>
      <div className="logo-container">
        <Link to="/dashboard">
          <img
            src={require("../images/am-logo-header.png")}
            alt="Business Logo"
            className="logo"
          />
        </Link>
      </div>

      <div className="nav-container">
        <Link to="/dashboard">Home</Link>
        <Link to="/sell">Sell</Link>
        <Link to="/myads">My Products</Link>
        <Link onClick={logout} to="/">
          Log Out
        </Link>
      </div>
    </div>
  );
}

export default Header;
