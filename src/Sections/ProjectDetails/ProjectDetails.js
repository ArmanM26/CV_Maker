import React, { useState } from "react";
import { db } from "../../Firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import "./ProjectDetails.css";

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
    </form>
  );
}

export default ProjectDetails;
