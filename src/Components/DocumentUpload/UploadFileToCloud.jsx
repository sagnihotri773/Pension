import React, { useState, useRef, useEffect } from "react";
import "./documentUpload.css";
import { useSelector } from "react-redux";
import ConfirmationPopup from "../../Utils/ConfirmationPopup";
import axios from "axios";
import InfoModal from "../../Utils/InfoModal";

const UploadFileToCloud = ({
  setSelectedFiles,
  selectedFiles,
  calculateTotalFileSize,
  totalFileSizeMB,
  setTotalFileSizeMB,
}) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [uploadedFile, setUploadedFile] = useState([]);
  const [deleteFileIndex, setDeleteFileIndex] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDelete = (index) => {
    console.log("Item deleted!");
    setDeleteFileIndex(index);
    setShowDeletePopup(true); // close modal
  };

  const handleCancel = () => {
    setShowDeletePopup(false); // just close
  };

  const checkIfAllCompleted = () => {
    const total = selectedFiles?.length;
    const completed = uploadedCount + failedCount;

    if (completed === total) {
      setIsUploading(false);
      if (failedCount === 0) {
        // toast.success("All files uploaded successfully.");
        setMessage("All files uploaded successfully.");
        setMessageType("success");
        setShowModal(true);
        setSelectedFiles([]);
      } else {
        // toast.warn(`${uploadedCount} file(s) uploaded, ${failedCount} failed.`);
        setMessage(`${uploadedCount} file(s) uploaded, ${failedCount} failed.`);
        setMessageType("warning");
        setShowModal(true);
      }
    }
  };
  //   const uploadFileToBlob = async (file) => {
  //     const fileName = encodeURIComponent(file.name);
  //     const sasToken =
  //       "sp=racwdl&st=2025-06-06T18:16:16Z&se=2025-06-07T02:16:16Z&skoid=fa232db8-d4bf-4d7b-81ba-20dbe6538dd3&sktid=b8e11e66-27bb-49eb-91d1-e2b78accf607&skt=2025-06-06T18:16:16Z&ske=2025-06-07T02:16:16Z&sks=b&skv=2024-11-04&spr=https&sv=2024-11-04&sr=c&sig=pxXtEXa2Ai491mpmdgcFRoQHZ02H7rZVC4vLToRdS5U%3D";
  //     const sasUrl = `https://pbgcdatalake11.blob.core.windows.net/pbgcfiles/${fileName}?${sasToken}`;

  //     try {
  //       const response = await fetch(sasUrl, {
  //         method: "PUT",
  //         headers: {
  //           "x-ms-blob-type": "BlockBlob",
  //         },
  //         body: file,
  //       });

  //       if (response.ok) {
  //         console.log(`${file.name} uploaded successfully.`);
  //         // increment uploaded count or state
  //       } else {
  //         console.error(
  //           `Failed to upload ${file.name}. Status: ${response.status}`
  //         );
  //         // increment failed count or state
  //       }
  //     } catch (error) {
  //       console.error(`Error uploading ${file.name}:`, error);
  //       // increment failed count or state
  //     } finally {
  //       // check if all uploads are completed
  //       // checkIfAllCompleted();
  //     }
  //   };

  const uploadFileToBlob = async (file) => {
    setLoading(true);
    // const fileName = encodeURIComponent(file.name);
    // const sasToken =
    //   "sp=racwdl&st=2025-06-06T18:16:16Z&se=2025-06-07T02:16:16Z&skoid=fa232db8-d4bf-4d7b-81ba-20dbe6538dd3&sktid=b8e11e66-27bb-49eb-91d1-e2b78accf607&skt=2025-06-06T18:16:16Z&ske=2025-06-07T02:16:16Z&sks=b&skv=2024-11-04&spr=https&sv=2024-11-04&sr=c&sig=pxXtEXa2Ai491mpmdgcFRoQHZ02H7rZVC4vLToRdS5U%3D";

    // const sasUrl = `https://pbgcdatalake11.blob.core.windows.net/pbgcfiles/${fileName}?${sasToken}`;
    const fileName = encodeURIComponent(file.name);
    const sasToken =
      "sp=rcwd&st=2025-06-07T14:37:17Z&se=2026-06-07T22:37:17Z&spr=https&sv=2024-11-04&sr=c&sig=fFCBhNnEb%2F6CQt3ch9e4FMoK%2BSFcE29m4Ong8fsqBQ0%3D";
    const sasUrl = `https://pbgcdatalake11.blob.core.windows.net/pbgcfiles/${fileName}?${sasToken}`;
    try {
      const response = await axios.put(sasUrl, file, {
        headers: {
          "x-ms-blob-type": "BlockBlob",
          "Content-Type": file.type, // Optional, sets correct MIME type
        },
      });

      if (response.status === 201) {
        console.log(`${file.name} uploaded successfully.`);
        setMessage("All files uploaded successfully.");
        setMessageType("success");
        setShowModal(true);
        setSelectedFiles([]);
        setLoading(false);
        setTotalFileSizeMB(0);
        // increment uploaded count or state
      } else {
        console.error(
          `Failed to upload ${file.name}. Status: ${response.status}`
        );
        setMessage(`${uploadedCount} file(s) uploaded, ${failedCount} failed.`);
        setMessageType("warning");
        setShowModal(true);
        // increment failed count or state
      }
    } catch (error) {
      console.error(`Error uploading ${file.name}:`, error);
      // increment failed count or state
    } finally {
      setLoading(false);
      // check if all uploads are completed
      // checkIfAllCompleted();
    }
  };

  const handleSubmit = async () => {
    if (!selectedFiles.length) {
      toast.warn("No files to upload.");
      return;
    }

    const totalSizeMB =
      selectedFiles.reduce((sum, file) => sum + file.size, 0) / (1024 * 1024);
    if (totalSizeMB > 1024) {
      setMessage("Total file size exceeds 1 GB limit.");
      setMessageType("warning");
      setShowModal(true);
      return;
    }

    setIsUploading(true);
    setUploadedCount(0);
    setFailedCount(0);

    for (const file of selectedFiles) {
      await uploadFileToBlob(file);
      checkIfAllCompleted();
    }
    // setSelectedFiles([]);
  };
  const removeFile = () => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(deleteFileIndex, 1);
    setSelectedFiles(updatedFiles);
    calculateTotalFileSize(updatedFiles);
    setShowDeletePopup(false);
  };

  return (
    <>
      <div className="selected-files-section">
        <h3 className="subsection-title">Selected File/s</h3>
        <div className="file-list-container">
          {selectedFiles?.length === 0 ? (
            <p className="no-files">No files selected</p>
          ) : (
            <div className="file-container">
              {selectedFiles?.map((file, index) => (
                <>
                  <div className="file-item" key={file.id}>
                    <div className="files">
                      <div className="file-content">
                        <div className="file-icon ts">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            ></path>
                          </svg>
                        </div>
                        <div className="file-details">
                          <h3>{file.name}</h3>
                        </div>
                      </div>

                      <button
                        className="remove-btn"
                        onClick={() => handleDelete(index)}
                      >
                        <svg
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div className="queued">
                      <p>{loading ? "Uploading" : "Queued"}</p>
                      <p className="file-size">
                        File Size :{(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                </>
              ))}
            </div>
          )}
        </div>

        {selectedFiles?.length > 0 ? (
          <div className="submit-button-container">
            <p className="total-size">
              Total File Size:
              {totalFileSizeMB.toFixed(2)}
              MB
            </p>
            <button
              type="button"
              className="action-button submit-button"
              onClick={() => handleSubmit()}
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
        ) : (
          ""
        )}
      </div>

      {showDeletePopup && (
        <ConfirmationPopup
          show={showDeletePopup}
          message="Are you sure you want to delete this Document?"
          onConfirm={removeFile}
          onCancel={handleCancel}
        />
      )}
      <InfoModal
        show={showModal}
        type={messageType}
        message={message}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default UploadFileToCloud;
