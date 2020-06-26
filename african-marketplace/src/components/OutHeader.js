import React from "react";
import { Link } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";

function OutHeader() {
  const [darkMode, setDarkMode] = useDarkMode();

  const toggleMode = (e) => {
    e.preventDefault();
    setDarkMode(!darkMode);
  };

  return (
    <div className="Outheader-container">
      <div>
        <Link to="/dashboard">
          <img
            src={require("../images/am-logo-header.png")}
            alt="Business Logo"
            className="logo"
          />
        </Link>
      </div>

      <div className="dark-mode__toggle">
        <div
          onClick={toggleMode}
          className={darkMode ? "toggle toggled" : "toggle"}
        />
      </div>
    </div>
  );
}

export default OutHeader;
