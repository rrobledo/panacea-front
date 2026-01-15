import React from "react";
import "./App.css";
import Main from "./components/Main";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Main />
      </ErrorBoundary>
    </div>
  );
}

export default App;
