import React from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import Card from "../Card/Card";

function Dashboard() {
  const navigate = useNavigate();

  const onCardClick = (cardName) => {
    console.log(`${cardName} card clicked!`);
    if (cardName === "Document Upload") {
      navigate("/document-upload");
    } else {
      alert(`Clicked: ${cardName}. Routing not implemented yet.`);
    }
  };

  return (
    <div className="dashboard-section">
      <h2>Pension Plan Data Management</h2>
      <div className="cards-container">
        <Card
          iconName="cloud-upload"
          cardTitle="Document Upload"
          onCardClick={onCardClick}
        />
        <Card
          iconName="document-search"
          cardTitle="Document Search"
          onCardClick={onCardClick}
        />
        <Card
          iconName="reports"
          cardTitle="Reports"
          onCardClick={onCardClick}
        />
        <Card iconName="admin" cardTitle="Admin" onCardClick={onCardClick} />
      </div>
    </div>
  );
}

export default Dashboard;
