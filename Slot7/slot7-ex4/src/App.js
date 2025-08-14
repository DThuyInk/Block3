import NameList from "./components/NameList";
import UserProfile from "./components/UserProfile";
import Welcome from "./components/Welcome";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// Dùng Container, Row, Col để bố trí các Card
import StudentCard from "./components/StudentCard"; // Import StudentCard component

function App() {
  const userData = { name: "traltb@fe.edu.vn", age: 39 };
  const namesList = ["traltb@fe.edu.vn", "test@fe.edu.vn"];
  //Danh sach students
  const students = [
    { name: "traltb1@fe.edu.vn", age: 39, avatar: "/images/student1.jpg" },
    { name: "traltb2@fe.edu.vn", age: 40, avatar: "/images/student2.jpg" },
    { name: "traltb3@fe.edu.vn", age: 41, avatar: "/images/student3.jpg" },
  ];
  return (
    <>
      <Welcome name="traltb@fe.edu.vn" />
      <UserProfile user={userData} />
      <NameList names={namesList} />
      <Container>
        <h1 className="my-4 text-center">Student information</h1>
        <div style={{ display: "flex", flexDirection: "row", gap: "20px", justifyContent: "center" }}>
          {students.map((student, index) => (
            <StudentCard key={index} student={student} />
          ))}
        </div>
      </Container>
    </>
  );
}

export default App;
