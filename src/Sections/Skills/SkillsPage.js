import React, { useState } from "react";
import { db } from "../../Firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import "./SkillsPage.css";

function SkillsPage() {
  const [skillsData, setSkillsData] = useState({
    skillName: "",
    proficiencyLevel: "",
  });

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
    </form>
  );
}

export default SkillsPage; // Ensure the correct export
