import React from "react";
import "./ProfileSection.css";

function ProfileSection() {
  return (
    <div>
      <h2>Add your profile details</h2>
      <div className="form-group">
        <label>First Name</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Phone Number</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Address</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Profile Image</label>
        <input type="file" />
      </div>
    </div>
  );
}

export default ProfileSection;
