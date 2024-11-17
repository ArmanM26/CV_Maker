import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ProfileSection from "./Sections/ProfileSection/ProfileSection";
import EducationPage from "./Sections/Education/education";
import SkillsPage from "./Sections/Skills/SkillsPage";
import ProjectDetails from "./Sections/ProjectDetails/ProjectDetails";
import SocialLinks from "./Sections/SocialLinks/SocialLinks";
import ResumePage from "./Sections/ResumePage/ResumePage";
import Progress from "./Sections/Progress/Progress";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";

// Component to handle conditional rendering
const ConditionalWrapper = ({ children }) => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/" || location.pathname === "/register";

  return (
    <div>
      {/* Only render the title and progress bar if it's not on the login or register page */}
      {!isAuthPage && <h1>RESUME GENERATOR</h1>}
      {!isAuthPage && <Progress />}
      {children}
    </div>
  );
};

function App() {
  return (
    <Router>
      <ConditionalWrapper>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfileSection />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/project-details" element={<ProjectDetails />} />
          <Route path="/social-links" element={<SocialLinks />} />
          <Route path="/resume" element={<ResumePage />} />
        </Routes>
      </ConditionalWrapper>
    </Router>
  );
}

export default App;
