import React from "react";
import ProfileForm from "./ProfileForm";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Profile Form</h1>
      </header>
      <main className="app-main">
        <div className="form-card">
          <ProfileForm />
        </div>
      </main>
      <footer className="app-footer">
        <p>&copy; 2025 Profile App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

