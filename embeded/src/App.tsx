import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        padding: 30,
        backgroundColor: "#cdcdcd",
        textAlign: "center",
      }}
    >
      <h1>Embedded application</h1>
    </div>
  );
}

export default App;
