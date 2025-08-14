import React from "react";

const NameList = ({ names }) => (
  <div>
    <h3>Name List</h3>
    <ul>
      {names.map((name, idx) => (
        <li key={idx}>{name}</li>
      ))}
    </ul>
  </div>
);

export default NameList;