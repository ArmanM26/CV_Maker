import React, { useState } from "react";
import { db } from "../../Firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./SkillsPage.css";

function SkillsPage() {
  const [skillsData, setSkillsData] = useState({
    skillName: "",
    proficiencyLevel: "",
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setSkillsData({
      ...skillsData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save to Firestore
      await addDoc(collection(db, "skillsData"), skillsData);
      alert("Skills data saved to Firebase!");
    } catch (error) {
      console.error("Error saving skills data: ", error);
      alert("Failed to save skills data to Firebase.");
    }
  };

  const handleNext = () => {
    navigate("/project-details"); // Navigate to the ProjectDetails page
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="skillName"
        placeholder="Skill Name"
        value={skillsData.skillName}
        onChange={handleChange}
      />
      <button type="submit">Save Skills</button>
      <button type="button" onClick={handleNext}>
        Next
      </button>{" "}
      {/* Next Button */}
    </form>
  );
}

export default SkillsPage;
