import React, { useState } from "react";
import { db } from "../../Firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./ProjectDetails.css"; // Ensure your CSS file is correctly linked

function ProjectDetails() {
  // State for storing project details
  const [projectData, setProjectData] = useState({
    projectName: "",
    techStack: "",
    description: "",
  });

  const navigate = useNavigate(); // For navigation between steps

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "projectsData"), projectData); // Add to Firestore
      alert("Project data saved successfully!");
    } catch (error) {
      console.error("Error saving project data: ", error);
      alert("Failed to save project data.");
    }
  };

  // Navigate to the next step
  const handleNext = () => {
    navigate("/social-links"); // Adjust this route based on your setup
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      {/* Input for Project Name */}
      <input
        type="text"
        name="projectName"
        placeholder="Project Name *"
        value={projectData.projectName}
        onChange={handleChange}
        required
      />

      {/* Input for Tech Stack */}
      <input
        type="text"
        name="techStack"
        placeholder="Tech Stack"
        value={projectData.techStack}
        onChange={handleChange}
      />

      {/* Textarea for Description */}
      <textarea
        name="description"
        placeholder="Project Description"
        value={projectData.description}
        onChange={handleChange}
        rows="4"
      />

      {/* Save Project Button */}
      <button type="submit" className="btn-save">
        Save Project
      </button>

      {/* Navigate to Next Step */}
      <button type="button" className="btn-next" onClick={handleNext}>
        Next
      </button>
    </form>
  );
}

export default ProjectDetails;
