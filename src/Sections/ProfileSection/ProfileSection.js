import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook for navigation
import "./ProfileSection.css";

function ProfileSection() {
  const navigate = useNavigate(); // Set up navigation

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("profileData", JSON.stringify(formData));
    alert("Profile saved to localStorage!");
  };

  const handleNext = (e) => {
    e.preventDefault();
    // After filling the profile, navigate to the next page (education details page)
    navigate("./education");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
      />
      <button type="submit">Save Profile</button>
      <button type="button" onClick={handleNext}>
        Next
      </button>
    </form>
  );
}

export default ProfileSection;
