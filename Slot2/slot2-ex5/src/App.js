import React from 'react';
import './App.css';



function App() {
  const courses = ["React", "ReactNative", "NodeJs"];
  return (
  <div className="App" style={{ marginTop: "40px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}>
  <h1 style={{ fontWeight: "bold", margin: 0, textAlign: "center" }}>Course names</h1>
      <ul style={{ listStylePosition: "outside", fontSize: "2rem", width: "220px", paddingLeft: "32px", textAlign: "left", margin: 0 }}>
        {courses.map(course => (
          <li key={course} style={{ margin: "10px 0" }}>{course}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
