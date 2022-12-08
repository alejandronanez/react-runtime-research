import { useCallback, useEffect, useState } from "react";
import "./App.css";

const PARENT_URL = "http://localhost:3000/";

type OutboundEvent = {
  type: "SUCCESS" | "CANCEL" | "RESET";
};

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
    const outboundEvent: OutboundEvent = {
      type: "SUCCESS",
    };
    window.parent.postMessage(outboundEvent, PARENT_URL);
  };

  const handleClickCancel = () => {
    const outboundEvent: OutboundEvent = {
      type: "CANCEL",
    };
    window.parent.postMessage(outboundEvent, PARENT_URL);
  };

  const handleClickReset = () => {
    const outboundEvent: OutboundEvent = {
      type: "RESET",
    };
    window.parent.postMessage(outboundEvent, PARENT_URL);
  };

  return (
    <div className="wrapper">
      <h1>Embedded application</h1>
      <pre>{messageFromParent}</pre>
      <div className="button-wrapper">
        <button onClick={handleClickSuccess}>Success</button>
        <button onClick={handleClickCancel}>Cancel</button>
        <button onClick={handleClickReset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
