// components/InfoModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";
import {
  BsCheckCircle,
  BsXCircle,
  BsInfoCircle,
  BsExclamationTriangle,
} from "react-icons/bs";
import "./modal.css";

const typeConfig = {
  success: {
    icon: <BsCheckCircle className="text-success" size={22} />,
    title: "Success",
    variant: "success",
    labelClass: "info-modal-type-success",
  },
  error: {
    icon: <BsXCircle className="text-danger" size={22} />,
    title: "Error",
    variant: "danger",
    labelClass: "info-modal-type-error",
  },
  info: {
    icon: <BsInfoCircle className="text-primary" size={22} />,
    title: "Information",
    variant: "primary",
    labelClass: "info-modal-type-info",
  },
  warning: {
    icon: <BsExclamationTriangle className="text-warning" size={22} />,
    title: "Warning",
    variant: "warning",
    labelClass: "info-modal-type-warning",
  },
};

function InfoModal({ show, type = "info", title, message, onClose }) {
  const config = typeConfig[type] || typeConfig.info;

  return (
    <Modal
      show={show}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      dialogClassName="info-modal-top-center"
      centered={false}
    >
      <Modal.Header className={config.labelClass} closeButton> 
        <Modal.Title className="d-flex align-items-center gap-2">
          {config.icon}
          {title || config.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{message || "Something happened."}</Modal.Body>
      <Modal.Footer>
        <Button variant={config.variant} onClick={onClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default InfoModal;
