import React from "react";
import "./header.css";
import logo from "../../assets/pbgc-logo.svg"
function Header() {
  return (
    <div className="app-header">
      <div className="logo-container">
        <img src={logo} alt="PBGC Logo" />
      </div>
      <div className="title-container">
        <h1>Pension Benefit Guaranty Corporation</h1>
        <p className="agency-tag">A U.S GOVERNMENT AGENCY</p>
      </div>
    </div>
  );
}

export default Header;
