import React, { useState } from "react";
import { db } from "../../Firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import "./SocialLinks.css"; // Optional: You can add some custom styling
import { useNavigate } from "react-router-dom";

function SocialLinks() {
  const [socialData, setSocialData] = useState({
    link: "",
  });

  const handleChange = (e) => {
    setSocialData({
      ...socialData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save to Firestore
      await addDoc(collection(db, "socialLinksData"), socialData);
      alert("Social media links saved to Firebase!");
    } catch (error) {
      console.error("Error saving social media links: ", error);
      alert("Failed to save social media links.");
    }
  };

  const handleNext = () => {
    navigate("/resume");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="url"
        name="Link"
        placeholder="URL"
        value={socialData.link}
        onChange={handleChange}
      />
      <button type="submit">Save Social Links</button>
      <button type="button" onClick={handleNext}>
        Next
      </button>
    </form>
  );
}

export default SocialLinks;
