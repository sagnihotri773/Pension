// File: src/components/FileUploader.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFile, removeFile } from "../../Redux/Features/FileSlice";
import "./fileUploader.css";
const FileUploaderForm = () => {
  const dispatch = useDispatch();
  const uploadedFiles = useSelector((state) => state.files.uploadedFiles);
console.log("uploadedFiles",uploadedFiles);

  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    documentName: "",
    documentCategory: "",
    documentType: "",
    ocrNeeded: false,
    planId: "",
    participantId: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;
    const fileInfo = {
      id: Date.now(),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      ...formData,
    };
    dispatch(addFile(fileInfo));
    setFile(null);
    setFormData({
      documentName: "",
      documentCategory: "",
      documentType: "",
      ocrNeeded: false,
      planId: "",
      participantId: "",
    });
  };

  const handleRemove = (id) => {
    dispatch(removeFile(id));
  };

  return (
    <div style={{ display: "flex", padding: "20px" }}>
      <div style={{ width: "50%", paddingRight: "20px" }}>
        <h3>File Upload</h3>
        <input type="file" onChange={handleFileChange} />
        <br />
        <br />
        <input
          type="text"
          placeholder="Document Name"
          name="documentName"
          value={formData.documentName}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <select
          name="documentCategory"
          value={formData.documentCategory}
          onChange={handleInputChange}
        >
          <option value="">Select Category</option>
          <option value="Financial">Financial</option>
          <option value="Legal">Legal</option>
        </select>
        <br />
        <br />
        <select
          name="documentType"
          value={formData.documentType}
          onChange={handleInputChange}
        >
          <option value="">Select Type</option>
          <option value="PDF">PDF</option>
          <option value="DOCX">DOCX</option>
        </select>
        <br />
        <br />
        <label>
          <input
            type="checkbox"
            name="ocrNeeded"
            checked={formData.ocrNeeded}
            onChange={handleInputChange}
          />{" "}
          OCR Needed?
        </label>
        <br />
        <br />
        <input
          type="text"
          placeholder="Plan ID"
          name="planId"
          value={formData.planId}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="Participant ID"
          name="participantId"
          value={formData.participantId}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <button onClick={handleUpload}>Upload</button>
      </div>

      <div style={{ width: "50%" }}>
        <h3>Selected File/s</h3>
        {uploadedFiles?.map((file) => (
          <div
            key={file.id}
            style={{
              background: "#e0f0ff",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <strong>{file.name}</strong> <br />
            Size: {file.size} <br />
            <button
              onClick={() => handleRemove(file.id)}
              style={{ color: "red" }}
            >
              Remove
            </button>
          </div>
        ))}
        <strong>Total File Size:</strong>{" "}
        {uploadedFiles?.reduce((acc, f) => acc + parseFloat(f.size), 0)
          .toFixed(2)}{" "}
        MB
      </div>
    </div>
  );
};

export default FileUploaderForm;
