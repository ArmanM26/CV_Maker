import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfileSection from "./Sections/ProfileSection/ProfileSection";
import EducationPage from "./Sections/Education/education";
import SkillsPage from "./Sections/Skills/SkillsPage"; // Corrected import for SkillsPage.js
import ProjectDetails from "./Sections/ProjectDetails/ProjectDetails"; // Import ProjectDetails
import SocialLinks from "./Sections/SocialLinks/SocialLinks"; // Import SocialLinks
import ResumePage from "./Sections/ResumePage/ResumePage";
import Progress from "./Sections/Progress/Progress";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";

function App() {
  return (
    <div>
      {/* Single parent element */}
      <h1>RESUME GENERATOR</h1>
      <Router>
        <Progress />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProfileSection />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/skills" element={<SkillsPage />} />{" "}
          <Route path="/project-details" element={<ProjectDetails />} />{" "}
          <Route path="/social-links" element={<SocialLinks />} />{" "}
          <Route path="/resume" element={<ResumePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
