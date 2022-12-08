import { useCallback, useEffect, useState } from "react";
import "./App.css";

const PARENT_URL = "http://127.0.0.1:5173/";

function App() {
  const [messageFromParent, setMessageFromParent] = useState("");

  const receiveMessageCallback = useCallback((e: MessageEvent) => {
    setMessageFromParent(e.data);
  }, []);

  useEffect(() => {
    window.addEventListener("message", receiveMessageCallback);

    return () => window.removeEventListener("message", receiveMessageCallback);
  }, []);

  const handleClickSuccess = () => {
    window.parent.postMessage("'Success' action", PARENT_URL);
  };

  const handleClickCancel = () => {
    window.parent.postMessage("'Cancel' action", PARENT_URL);
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
      <button onClick={handleClickCancel}>Cancel</button>
    </div>
  );
}

export default App;
