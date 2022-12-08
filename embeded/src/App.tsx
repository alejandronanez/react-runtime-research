import { useCallback, useEffect, useState } from "react";
import "./App.css";

const PARENT_URL = "http://127.0.0.1:5173/";

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
      <pre>Message from parent: {messageFromParent}</pre>
      <button onClick={handleClickSuccess}>Success</button>
      <br />
      <br />
      <button onClick={handleClickCancel}>Cancel</button>
      <br />
      <br />
      <button onClick={handleClickReset}>Reset</button>
    </div>
  );
}

export default App;
