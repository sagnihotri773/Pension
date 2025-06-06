import React from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/dashboard"); // Make sure /dashboard route exists
  };

  return (
    <div className="login-card-container">
      <div className="card welcome">
        <h2>Welcome to Pension Plan Data Management</h2>
        <button onClick={goToLogin} className="login-btn">
          Sign in
        </button>
      </div>
    </div>
  );
}

export default Welcome;
