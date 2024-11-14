import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../Firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import "./EducationPage.css";

function EducationPage() {
  const navigate = useNavigate();

  const [educationData, setEducationData] = useState({
    courseName: "",
    collegeName: "",
    completionYear: "",
    percentage: "",
  });

  const handleChange = (e) => {
    setEducationData({
      ...educationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save to Firestore
      await addDoc(collection(db, "educationData"), educationData);
      alert("Education details saved to Firebase!");
      navigate("/skills"); // Navigate to the Skills page after saving
    } catch (error) {
      console.error("Error saving education details: ", error);
      alert("Failed to save education details to Firebase.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="courseName"
        placeholder="Course Name"
        value={educationData.courseName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="collegeName"
        placeholder="College/School Name"
        value={educationData.collegeName}
        onChange={handleChange}
      />
      <input
        type="number"
        name="completionYear"
        placeholder="Completion Year"
        value={educationData.completionYear}
        onChange={handleChange}
      />
      <input
        type="text"
        name="percentage"
        placeholder="Percentage"
        value={educationData.percentage}
        onChange={handleChange}
      />
      <button type="submit">Save Education</button>
      <button type="button" onClick={() => navigate("/skills")}>
        Next
      </button>
    </form>
  );
}

export default EducationPage;
