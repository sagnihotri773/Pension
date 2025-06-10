import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import Card from "../Card/Card";
import InfoModal from "../../Utils/InfoModal";

function Dashboard() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const onCardClick = (cardName) => {
    console.log(`${cardName} card clicked!`);
    if (cardName === "Document Upload") {
      navigate("/document-upload");
    } else {
      setMessage(`Clicked: ${cardName}. Routing not implemented yet.`);
      setMessageType("warning");
      setShowModal(true);
      // alert(`Clicked: ${cardName}. Routing not implemented yet.`);
    }
  };

  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <div className="dashboard-section">
      <h2>Pension Plan Data Management</h2>
      <span className="back-arrow" onClick={() => handleNavigate()}>
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          fill="currentColor"
          class="bi bi-arrow-left-short"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
          />
        </svg>
      </span>
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
      <InfoModal
        show={showModal}
        type={messageType}
        message={message}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}

export default Dashboard;
