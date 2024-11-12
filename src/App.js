import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfileSection from "./Sections/ProfileSection/ProfileSection";
import EducationPage from "./Sections/Education/education";

function App() {
  return (
    <div>
      {" "}
      {/* Single parent element */}
      <h1>RESUME GENERATOR</h1>
      <Router>
        <Routes>
          <Route path="/" element={<ProfileSection />} />
          <Route path="/education" element={<EducationPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
