// DocumentUpload.js
import React, { useState, useRef } from 'react';
import './documentUpload.css';

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [documentCategory, setDocumentCategory] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [ocrNeeded, setOcrNeeded] = useState(false);
  const [planId, setPlanId] = useState('');
  const [participantId, setParticipantId] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const fileInputRef = useRef();

  const onFileSelected = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setSelectedFiles((prevFiles) => [...prevFiles, selectedFile]);
      event.target.value = '';
    }
  };

  const onUpload = () => {
    if (file) {
      alert(`Uploading file: ${file.name}`);
      console.log({
        file: file.name,
        documentCategory,
        documentType,
        documentName,
        ocrNeeded,
        planId,
        participantId,
      });
    } else {
      alert('Please select a file to upload.');
    }
  };

  const onReset = () => {
    setFile(null);
    setDocumentCategory('');
    setDocumentType('');
    setDocumentName('');
    setOcrNeeded(false);
    setPlanId('');
    setParticipantId('');
  };

  const onSubmit = () => {
    if (selectedFiles.length === 0) {
      alert('No files selected!');
      return;
    }
    alert('Submitting all selected files...');
    setSelectedFiles([]);
  };

  return (
    <div className="document-upload-container">
      <h2>Pension Plan Data Management</h2>
      <h2 className="section-title">Document Upload</h2>

      <div className="content-wrapper">
        <div className="file-upload-section">
          <h3 className="subsection-title">File Upload</h3>

          <div className="form-group">
            <label htmlFor="file">File *</label>
            <div className="input-with-button">
              <input
                type="file"
                id="file"
                onChange={onFileSelected}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
              <input
                type="text"
                value={file ? file.name : ''}
                placeholder="No file chosen"
                readOnly
              />
              <button type="button" className="browse-button" onClick={() => fileInputRef.current.click()}>
                Browse
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="docCategory">Document Category *</label>
            <div className="input-with-dropdown">
              <input
                type="text"
                id="docCategory"
                value={documentCategory}
                onChange={(e) => setDocumentCategory(e.target.value)}
                placeholder="Select Category"
              />
              <span className="dropdown-arrow">▼</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="docType">Document Type</label>
            <div className="input-with-dropdown">
              <input
                type="text"
                id="docType"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                placeholder="Select Type"
              />
              <span className="dropdown-arrow">▼</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="docName">Document Name</label>
            <input
              type="text"
              id="docName"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
            />
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
            <label htmlFor="planId">Plan ID</label>
            <div className="input-with-search">
              <input
                type="text"
                id="planId"
                value={planId}
                onChange={(e) => setPlanId(e.target.value)}
              />
              <button type="button" className="search-button">🔍</button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="participantId">Participant ID</label>
            <div className="input-with-search">
              <input
                type="text"
                id="participantId"
                value={participantId}
                onChange={(e) => setParticipantId(e.target.value)}
              />
              <button type="button" className="search-button">🔍</button>
            </div>
          </div>

          <div className="form-buttons">
            <button type="button" className="action-button upload" onClick={onUpload}>
              Upload
            </button>
            <button type="button" className="action-button reset" onClick={onReset}>
              Reset
            </button>
          </div>
        </div>

        <div className="selected-files-section">
          <h3 className="subsection-title">Selected File/s</h3>
          <div className="file-list-container">
            {selectedFiles.length === 0 ? (
              <p className="no-files">No files selected</p>
            ) : (
              <ul className="selected-files-list">
                {selectedFiles.map((file, idx) => (
                  <li key={idx}>
                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="submit-button-container">
            <button type="button" className="submit-button" onClick={onSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;
