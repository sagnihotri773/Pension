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
import { CloseIconSvg } from "./Svg";

const typeConfig = {
  success: {
    icon: <BsCheckCircle className="text-success" size={25} />,
    title: "Success",
    variant: "success",
    labelClass: "info-modal-type-success",
    iconColor: "success-icon",
  },
  error: {
    icon: <BsXCircle className="text-danger" size={22} />,
    title: "Error",
    variant: "danger",
    labelClass: "info-modal-type-error",
    iconColor: "error-icon",

  },
  info: {
    icon: <BsInfoCircle className="text-primary" size={22} />,
    title: "Information",
    variant: "primary",
    labelClass: "info-modal-type-info",
    iconColor: "info-icon",

  },
  warning: {
    icon: <BsExclamationTriangle className="text-warning" size={22} />,
    title: "Warning",
    variant: "warning",
    labelClass: "info-modal-type-warning",
    iconColor: "warning-icon",

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
      <Modal.Header className={config.labelClass} >
        <Modal.Title className="d-flex align-items-center gap-2">
          {config.icon}
          {title || config.title}
        </Modal.Title>
        <div className="ms-auto cursor-pointer" onClick={onClose}>
          <CloseIconSvg className={config.labelClass} />
        </div>
      </Modal.Header>
      <Modal.Body>
        {" "}
        {React.cloneElement(config.icon, { className: config.iconColor })} &nbsp;
        {message || "Something happened."}
      </Modal.Body>
      <Modal.Footer>
        <Button
          className={config.labelClass}
          variant={config.variant}
          onClick={onClose}
        >
          OK
        </Button>
      </Modal.Footer>  
    </Modal>
  );
}

export default InfoModal;
