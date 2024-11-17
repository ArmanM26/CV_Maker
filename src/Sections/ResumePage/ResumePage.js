import React, { useState, useEffect } from "react";
import { db } from "../../Firebase/firebase"; // Import the Firebase Firestore instance
import { collection, getDocs } from "firebase/firestore"; // Firestore functions
import { useNavigate } from "react-router-dom"; // If you want to navigate for editing profile
import "./ResumePage.css"; // Import your CSS file for styling

function ResumePage() {
  const [resumeData, setResumeData] = useState({
    profile: null,
    skills: [],
    projects: [],
    socialLinks: [],
    education: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          profileSnap,
          skillsSnap,
          projectsSnap,
          socialLinksSnap,
          educationSnap,
        ] = await Promise.all([
          getDocs(collection(db, "profiles")),
          getDocs(collection(db, "skillsData")),
          getDocs(collection(db, "projectsData")),
          getDocs(collection(db, "socialLinksData")),
          getDocs(collection(db, "educationData")),
        ]);

        setResumeData({
          profile:
            profileSnap.docs.length > 0 ? profileSnap.docs[0].data() : null,
          skills: skillsSnap.docs.map((doc) => doc.data()),
          projects: projectsSnap.docs.map((doc) => doc.data()),
          socialLinks: socialLinksSnap.docs.map((doc) => doc.data()),
          education: educationSnap.docs.map((doc) => doc.data()),
        });
      } catch (err) {
        console.error("Error fetching resume data:", err);
        setError("Failed to load resume data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const { profile, skills, projects, socialLinks, education } = resumeData;

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="resume-container">
      <h1>My Resume</h1>
      <button onClick={() => navigate("/profile")}>Edit Profile</button>

      {/* Profile Section */}
      <div className="section">
        <h2>Profile</h2>
        {profile ? (
          <div className="profile">
            {profile.image && (
              <img
                src={profile.image}
                alt="Profile"
                className="profile-image"
              />
            )}
            <p>
              <strong>
                {profile.firstName} {profile.lastName}
              </strong>
            </p>
            <p>{profile.phoneNumber}</p>
            <p>{profile.address}</p>
          </div>
        ) : (
          <p>No profile data available.</p>
        )}
      </div>

      {/* Education Section */}
      <div className="section">
        <h2>Education</h2>
        {education.length > 0 ? (
          <ul>
            {education.map((edu, index) => (
              <li key={index}>
                <strong>{edu.courseName}</strong> - {edu.collegeName} (
                {edu.completionYear})
                <br />
                <em>{edu.percentage}</em>
              </li>
            ))}
          </ul>
        ) : (
          <p>No education data available.</p>
        )}
      </div>

      {/* Skills Section */}
      <div className="section">
        <h2>Skills</h2>
        {skills.length > 0 ? (
          <ul>
            {skills.map((skill, index) => (
              <li key={index}>
                <strong>{skill.skillName}</strong> - {skill.proficiencyLevel}
              </li>
            ))}
          </ul>
        ) : (
          <p>No skills data available.</p>
        )}
      </div>

      {/* Projects Section */}
      <div className="section">
        <h2>Projects</h2>
        {projects.length > 0 ? (
          <ul>
            {projects.map((project, index) => (
              <li key={index}>
                <strong>{project.projectName}</strong> ({project.techStack})
                <br />
                <p>{project.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No project data available.</p>
        )}
      </div>

      {/* Social Links Section */}
      <div className="section">
        <h2>Social Links</h2>
        {socialLinks.length > 0 ? (
          <ul>
            {socialLinks.map((link, index) => (
              <li key={index}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.platform}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No social links available.</p>
        )}
      </div>
    </div>
  );
}

export default ResumePage;
