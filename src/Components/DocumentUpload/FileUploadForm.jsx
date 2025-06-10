import React, { useState, useRef, useEffect } from "react";
import "./documentUpload.css";
import { useDispatch, useSelector } from "react-redux";
import { addFile, removeFile } from "../../Redux/Features/FileSlice";
import InfoModal from "../../Utils/InfoModal";
import ConfirmationPopup from "../../Utils/ConfirmationPopup";

const FileUploadForm = ({
  setSelectedFiles,
  selectedFiles,
  calculateTotalFileSize,
}) => {
  const [file, setFile] = useState(null);
  const [documentCategory, setDocumentCategory] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [ocrNeeded, setOcrNeeded] = useState(false);
  const [planId, setPlanId] = useState("");
  const [planName, setPlanName] = useState("");
  const [participantId, setParticipantId] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const dispatch = useDispatch();

  const [deleteId, setDeleteId] = useState("");
  const fileInputRef = useRef();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [totalFileSizeMB, setTotalFileSizeMB] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);

  //   const onFileSelected = (event) => {
  //     const selectedFile = event.target.files[0];
  //     if (selectedFile) {
  //       setFile(selectedFile);
  //     }
  //   };
  const handleFileSelected = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      setSelectedFileName(file.name);
      setDocumentName(file.name);
    } else {
      setSelectedFileName("");
    }
  };

  const handleUpload = () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      const duplicate = selectedFiles.find((f) => f.name === file.name);
      if (duplicate) {
        // alert("This file is already in the selected files list.");
        setMessage(`This file is already in the selected files list.`);
        setMessageType("warning");
        setShowModal(true);
        return;
      }
      const updatedFiles = [...selectedFiles, file];
      setSelectedFiles(updatedFiles);
      calculateTotalFileSize(updatedFiles);
      setSelectedFileName("");
      fileInputRef.current.value = "";
      setDocumentName("");
      setDocumentCategory("");
      setDocumentType("");
      setDocumentName("");
      setOcrNeeded(false);
      setPlanId("");
      setParticipantId("");
    } else {
      //   alert("Please select a file to upload.");
      setMessage(`Please select a file to upload.`);
      setMessageType("info");
      setShowModal(true);
    }
  };
  const onUpload = () => {
    if (file) {
      const fileInfo = {
        id: Date.now(),
        name: file.name,
        size: file.size,
        documentCategory,
        documentType,
        documentName,
        ocrNeeded,
        planId,
        participantId,
      };
      console.log("fileInfo", fileInfo);

      dispatch(addFile(fileInfo));
      setShowModal(true);
      setFile(null);
      setDocumentCategory("");
      setDocumentType("");
      setDocumentName("");
      setOcrNeeded(false);
      setPlanId("");
      setParticipantId("");
    } else {
      alert("Please select a file to upload.");
    }
  };

  const onReset = () => {
    setFile(null);
    setDocumentCategory("");
    setDocumentType("");
    setDocumentName("");
    setOcrNeeded(false);
    setPlanId("");
    setParticipantId("");
  };

  const onRemove = () => {
    dispatch(removeFile(deleteId));
    setShowDeletePopup(false); // close modal
  };

  const resetForm = () => {
    setSelectedFileName("");
    setDocumentName("");
    setDocumentCategory("");
    setDocumentType("");
    setOcrNeeded(false);
    setPlanId("");
    setParticipantId("");
    // setSelectedFiles([]);
    setTotalFileSizeMB(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const formIsValid =
    documentCategory &&
    documentType &&
    documentName &&
    planId &&
    participantId &&
    selectedFileName &&
    setPlanName;

  return (
    <>
      <div className="file-upload-section">
        <h3 className="subsection-title">File Upload</h3>

        <div className="form-group">
          <label htmlFor="file">
            File <span className="required-field"> *</span>{" "}
          </label>
          <div className="input-with-button">
            <button
              type="button"
              className="browse-button"
              onClick={() => fileInputRef.current.click()}
            >
              Choose File
            </button>
            <input
              type="file"
              id="file"
              onChange={handleFileSelected}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <input
              type="text"
              value={selectedFileName ? selectedFileName : ""}
              placeholder="No file chosen"
              readOnly
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="docName">
            Document Name <span className="required-field"> *</span>{" "}
          </label>
          <input
            type="text"
            id="docName"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="docCategory">
            Document Category <span className="required-field"> *</span>
          </label>
          <select
            className="document-dropdown"
            id="docCategory"
            value={documentCategory}
            onChange={(e) => setDocumentCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="1">Retirement Plans</option>
            <option value="2">
              Pension Benefit Guranty Corporation (PBGC) Filings
            </option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="docType">
            Document Type <span className="required-field"> *</span>
          </label>
          <select
            className="document-dropdown"
            id="docType"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="1">Government Filing</option>
            <option value="2">Compliance Form</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="docType">
            Plan Name <span className="required-field"> *</span>
          </label>
          <select
            className="document-dropdown"
            id="docType"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
          >
            <option value="">Select Plan</option>
            <option value="1">Form 501</option>
            <option value="2">Form 600</option>
            <option value="2">Form 701</option>
          </select>
        </div>
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="ocrNeeded"
            checked={ocrNeeded}
            onChange={() => setOcrNeeded(!ocrNeeded)}
          />
          <label htmlFor="ocrNeeded">OCR Needed?</label>
        </div>

        <div className="form-group">
          <label htmlFor="planId">
            Plan ID <span className="required-field"> *</span>
          </label>
          <div className="input-with-search">
            <input
              type="text"
              id="planId"
              value={planId}
              onChange={(e) => setPlanId(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="participantId">
            Participant ID <span className="required-field"> *</span>
          </label>
          <div className="input-with-search">
            <input
              type="text"
              id="participantId"
              value={participantId}
              onChange={(e) => setParticipantId(e.target.value)}
            />
          </div>
        </div>

        <div className="form-buttons">
          <button
            type="button"
            className={`action-button upload ${!formIsValid ? "disabled" : ""}`}
            onClick={handleUpload}
            disabled={!formIsValid}
          >
            Upload
          </button>
          <button
            type="button"
            className={`action-button reset ${!formIsValid ? "disabled" : ""}`}
            onClick={resetForm}
            disabled={!formIsValid}
          >
            Reset
          </button>
        </div>
      </div>

      <InfoModal
        show={showModal}
        type={messageType}
        message={message}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default FileUploadForm;
