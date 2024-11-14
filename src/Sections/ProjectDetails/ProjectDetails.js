import React, { useState } from "react";
import { db } from "../../Firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import "./ProjectDetails.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function ProjectDetails() {
  const [projectData, setProjectData] = useState({
    projectName: "",
    techStack: "",
    description: "",
  });

  const handleChange = (e) => {
    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate(); // Initialize navigate

  const handleNext = () => {
    navigate("/social-links"); // Navigate to the SocialLinks page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save to Firestore
      await addDoc(collection(db, "projectsData"), projectData);
      alert("Project data saved to Firebase!");
    } catch (error) {
      console.error("Error saving project data: ", error);
      alert("Failed to save project data to Firebase.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="projectName"
        placeholder="Project Name"
        value={projectData.projectName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="techStack"
        placeholder="Tech Stack"
        value={projectData.techStack}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Project Description"
        value={projectData.description}
        onChange={handleChange}
      />
      <button type="submit">Save Project</button>
      <button type="button" onClick={handleNext}>
        Next
      </button>{" "}
      {/* Next Button */}
    </form>
  );
}

export default ProjectDetails;
