import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../Firebase/firebase";
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import "./ProfileSection.css";

function ProfileSection() {
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save profile data to Firestore
      const docRef = await addDoc(collection(db, "profiles"), formData);
      alert("Profile saved to Firebase with ID: " + docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to save profile to Firebase.");
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    navigate("/education");
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
