// components/ConfirmationPopup.js
import React from "react";
import { Modal, Button } from "react-bootstrap";
import { BsExclamationTriangle } from "react-icons/bs";
import "./confirmationPopup.css"; // or ConfirmationModal.css

function ConfirmationPopup({ show, message, onConfirm, onCancel }) {
  return (
    <Modal
      show={show}
      onHide={onCancel}
      backdrop="static"
      keyboard={false}
      dialogClassName="confirmation-modal-top-center"
      centered={false}
    >
      <Modal.Header>
        <Modal.Title>
          <BsExclamationTriangle className="text-warning me-2" size={22} /> &nbsp;
          Confirm Action
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{message || "Are you sure you want to proceed?"}</Modal.Body>
      <Modal.Footer>
        <Button className="btn-custom-cancel" onClick={onCancel}>
          Cancel
        </Button> &nbsp; &nbsp;
        <Button className="btn-custom-confirm" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationPopup;
