import React from "react";
import ThemeToggleButton from "./ThemeToggleButton"; // Import ThemeToggleButton
import { ThemeProvider } from "./ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div>
        <h1>Welcome to React!</h1>
        <ThemeToggleButton />
      </div>
    </ThemeProvider>
  );
}

export default App;
