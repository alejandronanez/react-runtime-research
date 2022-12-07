import { useCallback, useEffect, useState } from "react";
import "./App.css";

const SUCCESS_EVENT = "merchant:event:success";
const CANCEL_EVENT = "merchant:event:cancel";
const URL = "http://127.0.0.1:5174/";
const PARENT_URL = "http://127.0.0.1:5173/";

function App() {
  const [messageFromParent, setMessageFromParent] = useState("");

  const callback = useCallback((e: any) => {
    console.log("child");
    setMessageFromParent(e.data);
  }, []);

  useEffect(() => {
    window.addEventListener("message", callback);

    return () => window.removeEventListener("message", callback);
  }, []);

  const handleClickSuccess = () => {
    window.parent.postMessage("Hi dad!", PARENT_URL);
  };

  return (
    <div
      style={{
        padding: 30,
        backgroundColor: "#cdcdcd",
        textAlign: "center",
      }}
    >
      <h1>Embedded application</h1>
      <pre>Message from parent: {messageFromParent}</pre>
      <button onClick={handleClickSuccess}>Success</button>
      <br />
      <br />
      <button>Cancel</button>
    </div>
  );
}

export default App;
