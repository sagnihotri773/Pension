import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css"; // For root styling
import Header from "./Components/Header/Header";
import Welcome from "./Components/Welcome/welcome";
import Dashboard from "./Components/Dashboard/Dashboard";
import DocumentUpload from "./Components/DocumentUpload/DocumentUpload";


function App() {
  return (
    <Router>
      <div className="app-root">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/document-upload" element={<DocumentUpload />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
