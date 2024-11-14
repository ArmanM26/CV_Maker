import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfileSection from "./Sections/ProfileSection/ProfileSection";
import EducationPage from "./Sections/Education/education";
import SkillsPage from "./Sections/Skills/SkillsPage"; // Corrected import for SkillsPage.js
import ProjectDetails from "./Sections/ProjectDetails/ProjectDetails"; // Import ProjectDetails

function App() {
  return (
    <div>
      {/* Single parent element */}
      <h1>RESUME GENERATOR</h1>
      <Router>
        <Routes>
          <Route path="/" element={<ProfileSection />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/skills" element={<SkillsPage />} />{" "}
          <Route path="/project-details" element={<ProjectDetails />} />{" "}
          {/* Route for ProjectDetails */}
          {/* Route for SkillsPage */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
