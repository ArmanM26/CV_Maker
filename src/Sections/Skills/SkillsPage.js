import React, { useState } from "react";
import { db } from "../../Firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./SkillsPage.css";

function SkillsPage() {
  const [skillsList, setSkillsList] = useState([{ skillName: "" }]); // Initial list with one input field for the skill

  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e, index) => {
    const updatedSkillsList = [...skillsList];
    updatedSkillsList[index][e.target.name] = e.target.value;
    setSkillsList(updatedSkillsList);
  };

  const handleAddSkill = () => {
    setSkillsList([
      ...skillsList,
      { skillName: "" }, // Add a new empty object for the new skill
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save each skill to Firestore
      for (const skill of skillsList) {
        if (skill.skillName) {
          // Check if skillName is not empty
          await addDoc(collection(db, "skillsData"), skill);
        }
      }
      alert("Skills data saved to Firebase!");
      setSkillsList([{ skillName: "" }]); // Clear the list after submission, keeping one input field
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
      {skillsList.map((skill, index) => (
        <div key={index}>
          <input
            type="text"
            name="skillName"
            placeholder="Skill Name"
            value={skill.skillName}
            onChange={(e) => handleChange(e, index)}
          />
        </div>
      ))}
      <button type="button" onClick={handleAddSkill}>
        Add Skill
      </button>{" "}
      {/* Button to add a new skill */}
      <button type="submit">Save Skills</button>
      <button type="button" onClick={handleNext}>
        Next
      </button>
    </form>
  );
}

export default SkillsPage;
