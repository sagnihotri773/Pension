import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css"; // For root styling
import Header from "./Components/Header/Header";
import Welcome from "./Components/Welcome/Welcome";
import Dashboard from "./Components/Dashboard/Dashboard";
import DocumentUpload from "./Components/DocumentUpload/DocumentUpload";
import MainLayout from "./Layouts/MainLayout";
import FileUploaderForm from "./Components/FileUploader/FileUploaderForm";

function App() {
  return (
    <Router>
      <div className="app-root">
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Welcome />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
          <Route path="/document-upload" element={<DocumentUpload />} />
          {/* <Route path="/document-upload" element={<FileUploaderForm />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
