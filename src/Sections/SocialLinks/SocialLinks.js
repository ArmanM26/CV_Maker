import React, { useState } from "react";
import { db } from "../../Firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./SocialLinks.css";

function SocialLinks() {
  const [socialLinks, setSocialLinks] = useState([{ link: "" }]); // Start with one empty link

  const handleChange = (e, index) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index].link = e.target.value;
    setSocialLinks(updatedLinks);
  };

  const handleAddLink = () => {
    setSocialLinks([...socialLinks, { link: "" }]); // Add a new empty link input
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save all social media links to Firestore
      for (const link of socialLinks) {
        if (link.link) {
          // Make sure the link is not empty
          await addDoc(collection(db, "socialLinksData"), { link: link.link });
        }
      }
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
      {socialLinks.map((socialLink, index) => (
        <div key={index}>
          <input
            type="url"
            name="link"
            placeholder="URL"
            value={socialLink.link}
            onChange={(e) => handleChange(e, index)} // Pass index for each link
          />
        </div>
      ))}
      <button type="button" onClick={handleAddLink}>
        Add Another Link
      </button>
      <button type="submit">Save Social Links</button>
      <button type="button" onClick={handleNext}>
        Next
      </button>
    </form>
  );
}

export default SocialLinks;
