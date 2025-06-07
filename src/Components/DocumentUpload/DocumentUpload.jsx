// // DocumentUpload.js
// import React, { useState, useRef, useEffect } from "react";
// import "./documentUpload.css";
// import { useDispatch, useSelector } from "react-redux";
// import { addFile, removeFile } from "../../Redux/Features/FileSlice";
// import InfoModal from "../../Utils/InfoModal";
// import ConfirmationPopup from "../../Utils/ConfirmationPopup";

// const DocumentUpload = () => {
//   const [file, setFile] = useState(null);
//   const [documentCategory, setDocumentCategory] = useState("");
//   const [documentType, setDocumentType] = useState("");
//   const [documentName, setDocumentName] = useState("");
//   const [ocrNeeded, setOcrNeeded] = useState(false);
//   const [planId, setPlanId] = useState("");
//   const [participantId, setParticipantId] = useState("");
//   const [uploadedFile, setUploadedFile] = useState([]);
//   const dispatch = useDispatch();
//   const uploadedFiles = useSelector((state) => state.files);
//   console.log("uploadedFiles", uploadedFiles);
//   const [deleteId, setDeleteId] = useState("");
//   const fileInputRef = useRef();
//   const [showModal, setShowModal] = useState(false);
//   const [showDeletePopup, setShowDeletePopup] = useState(false);

//   const handleDelete = (id) => {
//     console.log("Item deleted!");
//     setDeleteId(id);
//     setShowDeletePopup(true); // close modal
//   };

//   const handleCancel = () => {
//     setShowDeletePopup(false); // just close
//   };
//   useEffect(() => {
//     if (uploadedFiles) {
//       setUploadedFile(uploadedFiles);
//     }
//   }, [uploadedFiles]);
//   const onFileSelected = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//     }
//   };

//   const onUpload = () => {
//     if (file) {
//       const fileInfo = {
//         id: Date.now(),
//         name: file.name,
//         size: file.size,
//         documentCategory,
//         documentType,
//         documentName,
//         ocrNeeded,
//         planId,
//         participantId,
//       };
//       console.log("fileInfo", fileInfo);

//       dispatch(addFile(fileInfo));
//       setShowModal(true);
//       setFile(null);
//       setDocumentCategory("");
//       setDocumentType("");
//       setDocumentName("");
//       setOcrNeeded(false);
//       setPlanId("");
//       setParticipantId("");
//     } else {
//       alert("Please select a file to upload.");
//     }
//   };

//   const onReset = () => {
//     setFile(null);
//     setDocumentCategory("");
//     setDocumentType("");
//     setDocumentName("");
//     setOcrNeeded(false);
//     setPlanId("");
//     setParticipantId("");
//   };

//   const onRemove = () => {
//     dispatch(removeFile(deleteId));
//     setShowDeletePopup(false); // close modal
//   };

//   const uploadFileToBlob = async (file) => {
//   const fileName = encodeURIComponent(file.name);
//   const sasToken = 'sp=racwdl&st=2025-06-06T18:16:16Z&se=2025-06-07T02:16:16Z&skoid=fa232db8-d4bf-4d7b-81ba-20dbe6538dd3&sktid=b8e11e66-27bb-49eb-91d1-e2b78accf607&skt=2025-06-06T18:16:16Z&ske=2025-06-07T02:16:16Z&sks=b&skv=2024-11-04&spr=https&sv=2024-11-04&sr=c&sig=pxXtEXa2Ai491mpmdgcFRoQHZ02H7rZVC4vLToRdS5U%3D';
//   const sasUrl = `https://pbgcdatalake11.blob.core.windows.net/pbgcfiles/${fileName}?${sasToken}`;

//   try {
//     const response = await fetch(sasUrl, {
//       method: 'PUT',
//       headers: {
//         'x-ms-blob-type': 'BlockBlob'
//       },
//       body: file
//     });

//     if (response.ok) {
//       console.log(`${file.name} uploaded successfully.`);
//       // increment uploaded count or state
//     } else {
//       console.error(`Failed to upload ${file.name}. Status: ${response.status}`);
//       // increment failed count or state
//     }
//   } catch (error) {
//     console.error(`Error uploading ${file.name}:`, error);
//     // increment failed count or state
//   } finally {
//     // check if all uploads are completed
//     // checkIfAllCompleted();
//   }
// };
//   return (
//     <div className="document-upload-container">
//       <span className="back-arrow">
//         {" "}
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="35"
//           height="35"
//           fill="currentColor"
//           class="bi bi-arrow-left-short"
//           viewBox="0 0 16 16"
//         >
//           <path
//             fill-rule="evenodd"
//             d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
//           />
//         </svg>
//       </span>
//       <h2>Pension Plan Data Management</h2>
//       <h2 className="section-title">Document Upload</h2>

//       <div className="content-wrapper">
//         <div className="file-upload-section">
//           <h3 className="subsection-title">File Upload</h3>

//           <div className="form-group">
//             <label htmlFor="file">File *</label>
//             <div className="input-with-button">
//               <input
//                 type="file"
//                 id="file"
//                 onChange={onFileSelected}
//                 ref={fileInputRef}
//                 style={{ display: "none" }}
//               />
//               <input
//                 type="text"
//                 value={file ? file.name : ""}
//                 placeholder="No file chosen"
//                 readOnly
//               />
//               <button
//                 type="button"
//                 className="browse-button"
//                 onClick={() => fileInputRef.current.click()}
//               >
//                 Browse
//               </button>
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="docCategory">Document Category *</label>
//             <select
//               className="document-dropdown"
//               id="docCategory"
//               value={documentCategory}
//               onChange={(e) => setDocumentCategory(e.target.value)}
//             >
//               <option value="">Select Category</option>
//               <option value="1">1</option>
//               <option value="2">2</option>
//               <option value="3">3</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="docType">Document Type</label>
//             <select
//               className="document-dropdown"
//               id="docType"
//               value={documentType}
//               onChange={(e) => setDocumentType(e.target.value)}
//             >
//               <option value="">Select Type</option>
//               <option value="1">1</option>
//               <option value="2">2</option>
//               <option value="3">3</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="docName">Document Name</label>
//             <input
//               type="text"
//               id="docName"
//               value={documentName}
//               onChange={(e) => setDocumentName(e.target.value)}
//             />
//           </div>

//           <div className="form-group checkbox-group">
//             <input
//               type="checkbox"
//               id="ocrNeeded"
//               checked={ocrNeeded}
//               onChange={() => setOcrNeeded(!ocrNeeded)}
//             />
//             <label htmlFor="ocrNeeded">OCR Needed?</label>
//           </div>

//           <div className="form-group">
//             <label htmlFor="planId">Plan ID</label>
//             <div className="input-with-search">
//               <input
//                 type="text"
//                 id="planId"
//                 value={planId}
//                 onChange={(e) => setPlanId(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="participantId">Participant ID</label>
//             <div className="input-with-search">
//               <input
//                 type="text"
//                 id="participantId"
//                 value={participantId}
//                 onChange={(e) => setParticipantId(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="form-buttons">
//             <button
//               type="button"
//               className="action-button upload"
//               onClick={onUpload}
//             >
//               Upload
//             </button>
//             <button
//               type="button"
//               className="action-button reset"
//               onClick={onReset}
//             >
//               Reset
//             </button>
//           </div>
//         </div>

//         <div className="selected-files-section">
//           <h3 className="subsection-title">Selected File/s</h3>
//           <div className="file-list-container">
//             {uploadedFiles?.length === 0 ? (
//               <p className="no-files">No files selected</p>
//             ) : (
//               <div className="file-container">
//                 {uploadedFiles?.map((file) => (
//                   <>
//                     <div className="file-item" key={file.id}>
//                       <div className="files">
//                         <div className="file-content">
//                           <div className="file-icon ts">
//                             <svg
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                               ></path>
//                             </svg>
//                           </div>
//                           <div className="file-details">
//                             <h3>{file.name}</h3>
//                           </div>
//                         </div>

//                         <button
//                           className="remove-btn"
//                           onClick={() => handleDelete(file.id)}
//                         >
//                           <svg
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M6 18L18 6M6 6l12 12"
//                             ></path>
//                           </svg>
//                         </button>
//                       </div>
//                       <p className="file-size">
//                         File Size :{(file.size / 1024 / 1024).toFixed(2)} MB
//                       </p>
//                     </div>
//                   </>
//                 ))}
//               </div>
//             )}
//           </div>
//           <div className="submit-button-container">
//             <button type="button" className="action-button submit-button">
//               Submit
//             </button>
//           </div>
//           <p className="total-size">
//             Total File Size:
//             {uploadedFiles
//               ?.reduce((acc, f) => acc + parseFloat(f.size), 0)
//               .toFixed(2)}{" "}
//             MB
//           </p>
//         </div>
//       </div>
//       {showDeletePopup && (
//         <ConfirmationPopup
//           show={showDeletePopup}
//           message="Are you sure you want to delete this item?"
//           onConfirm={onRemove}
//           onCancel={handleCancel}
//         />
//       )}
//       <InfoModal
//         show={showModal}
//         type="success"
//         message="File Uploaded Successfully!"
//         onClose={() => setShowModal(false)}
//       />
//       <InfoModal
//         show={showModal}
//         type="error"
//         message="Please select a file to upload."
//         onClose={() => setShowModal(false)}
//       />
//     </div>
//   );
// };

// export default DocumentUpload;
