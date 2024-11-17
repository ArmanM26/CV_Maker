import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../../Firebase/firebase";
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import "./ProfileSection.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase Storage functions

function ProfileSection() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = "";
    if (formData.image) {
      const imageRef = ref(storage, `profile-images/${formData.image.name}`);
      await uploadBytes(imageRef, formData.image);
      imageUrl = await getDownloadURL(imageRef);
    }

    try {
      const docRef = await addDoc(collection(db, "profiles"), {
        ...formData,
        image: imageUrl, // Save image URL to Firestore
      });
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
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button type="submit">Save Profile</button>
      <button type="button" onClick={handleNext}>
        Next
      </button>
    </form>
  );
}

export default ProfileSection;
