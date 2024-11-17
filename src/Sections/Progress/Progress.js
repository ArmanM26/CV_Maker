import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./Progress.css";

const Progress = () => {
  const location = useLocation();

  // Define all steps
  const steps = [
    { path: "/", label: "Profile Section" },
    { path: "/education", label: "Education Section" },
    { path: "/skills", label: "Skills Sector" },
    { path: "/project-details", label: "Mini Project" },
    { path: "/social-links", label: "Social Links" },
  ];

  return (
    <div className="progress">
      {steps.map((step, index) => (
        <Link
          key={index}
          to={step.path} // Use Link for navigation
          className={`step ${location.pathname === step.path ? "active" : ""}`}
        >
          {step.label}
        </Link>
      ))}
    </div>
  );
};

export default Progress;
