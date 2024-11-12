import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the education data to localStorage or any further action
    localStorage.setItem("educationData", JSON.stringify(educationData));
    alert("Education details saved!");
  };

  const handleNext = (e) => {
    e.preventDefault();
    // Navigate to the next page (or do something else after the form submission)
    alert("Proceeding to next step...");
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
      <button type="button" onClick={handleNext}>
        Next
      </button>
    </form>
  );
}

export default EducationPage;
