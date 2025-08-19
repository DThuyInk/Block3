import React from "react";
import ValidatedInput from "./ValidateInput";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App" style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Kiểm tra ValidatedInput</h2>
      <ValidatedInput />
    </div>
  );
}

export default App;