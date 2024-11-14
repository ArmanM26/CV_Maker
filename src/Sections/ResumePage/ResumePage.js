import React, { useState, useEffect } from "react";
import { db } from "../../Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import "./ResumePage.css"; // Optional: Add custom styles

function ResumePage() {
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);

  // Fetch skills, projects, and social links from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const skillsSnapshot = await getDocs(collection(db, "skillsData"));
        const projectsSnapshot = await getDocs(collection(db, "projectsData"));
        const socialLinksSnapshot = await getDocs(
          collection(db, "socialLinksData")
        );

        const skillsData = skillsSnapshot.docs.map((doc) => doc.data());
        const projectsData = projectsSnapshot.docs.map((doc) => doc.data());
        const socialLinksData = socialLinksSnapshot.docs.map((doc) =>
          doc.data()
        );

        setSkills(skillsData);
        setProjects(projectsData);
        setSocialLinks(socialLinksData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="resume-container">
      <h1>My Resume</h1>

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

      <div className="section">
        <h2>Projects</h2>
        {projects.length > 0 ? (
          <ul>
            {projects.map((project, index) => (
              <li key={index}>
                <strong>{project.projectName}</strong> ({project.techStack})
                <p>{project.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No project data available.</p>
        )}
      </div>
    </div>
  );
}

export default ResumePage;
