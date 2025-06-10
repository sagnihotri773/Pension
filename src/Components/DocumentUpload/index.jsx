// DocumentUpload.js
import React, { useState, useRef, useEffect } from "react";
import "./documentUpload.css";
import { useDispatch, useSelector } from "react-redux";
import { addFile, removeFile } from "../../Redux/Features/FileSlice";
import InfoModal from "../../Utils/InfoModal";
import ConfirmationPopup from "../../Utils/ConfirmationPopup";
import FileUploadForm from "./FileUploadForm";
import UploadFileToCloud from "./UploadFileToCloud";
import { useNavigate } from "react-router-dom";

const DocumentUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [totalFileSizeMB, setTotalFileSizeMB] = useState(0);
  const navigate = useNavigate();
  const calculateTotalFileSize = (files) => {
    const totalSize =
      files.reduce((sum, file) => sum + file.size, 0) / (1024 * 1024);
    setTotalFileSizeMB(totalSize);
  };

  const removeFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    calculateTotalFileSize(updatedFiles);
  };

  const handleNavigate = () => {
    navigate("/dashboard");
  };
  return (
    <div className="document-upload-container">
      <div className="top-heading" onClick={() => handleNavigate()}>
        <div className="back-arrow-container">
          <p className="back-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="white"
              class="bi bi-arrow-left-short"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
              />
            </svg>
          </p>
          <p> Back</p>
        </div>
      </div>
      <h2>Pension Plan Data Management</h2>
      <h2 className="section-title">Document Upload</h2>
      <div className="content-wrapper">
        <FileUploadForm
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          calculateTotalFileSize={calculateTotalFileSize}
        />
        <UploadFileToCloud
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          calculateTotalFileSize={calculateTotalFileSize}
          totalFileSizeMB={totalFileSizeMB}
          setTotalFileSizeMB={setTotalFileSizeMB}
        />
      </div>
    </div>
  );
};

export default DocumentUpload;
