import React from "react";

const UserProfile = ({ user }) => (
  <div>
    <h3>User Profile</h3>
    <p>Name: {user.name}</p>
    <p>Age: {user.age}</p>
  </div>
);

export default UserProfile;