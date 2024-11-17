import React, { useState, useEffect } from "react";
import { db } from "../../Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import "./ResumePage.css";

function ResumePage() {
  const [profile, setProfile] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [education, setEducation] = useState([]);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileSnapshot = await getDocs(collection(db, "profiles"));
        const skillsSnapshot = await getDocs(collection(db, "skillsData"));
        const projectsSnapshot = await getDocs(collection(db, "projectsData"));
        const socialLinksSnapshot = await getDocs(
          collection(db, "socialLinksData")
        );
        const educationSnapshot = await getDocs(
          collection(db, "educationData")
        );

        const profileData = profileSnapshot.docs.map((doc) => doc.data());
        const skillsData = skillsSnapshot.docs.map((doc) => doc.data());
        const projectsData = projectsSnapshot.docs.map((doc) => doc.data());
        const socialLinksData = socialLinksSnapshot.docs.map((doc) =>
          doc.data()
        );
        const educationData = educationSnapshot.docs.map((doc) => doc.data());

        setProfile(profileData);
        setSkills(skillsData);
        setProjects(projectsData);
        setSocialLinks(socialLinksData);
        setEducation(educationData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  // Extract profile data (Assumes there's only one document in "profiles" collection)
  const userProfile = profile.length > 0 ? profile[0] : null;

  return (
    <div className="resume-container">
      <h1>My Resume</h1>

      {/* Profile Section */}
      <div className="section">
        <h2>Profile</h2>
        {userProfile ? (
          <div className="profile">
            <img
              src={userProfile.image}
              alt="Profile"
              className="profile-image"
            />
            <p>
              <strong>
                {userProfile.firstName} {userProfile.lastName}
              </strong>
            </p>
            <p>{userProfile.phoneNumber}</p>
            <p>{userProfile.address}</p>
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
                {edu.completionYear})<br />
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
                <a href={link} target="_blank" rel="noopener noreferrer"></a>
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
