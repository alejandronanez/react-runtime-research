import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

type AppProps = {
  embeddedUrl: string;
  embeddedSuccessEvent: string;
  embeddedCancelEvent: string;
};
function App({
  embeddedCancelEvent,
  embeddedSuccessEvent,
  embeddedUrl,
}: AppProps) {
  const [messageFromChild, setMessageFromChild] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const sendMessage = () => {
    if (!iframeRef?.current?.contentWindow) {
      return;
    }

    iframeRef.current.contentWindow.postMessage(
      'message sent from the parent',
      embeddedUrl,
    );
  };

  const receiveMessageCallback = useCallback((e: MessageEvent) => {
    /**
     * e.data could be an object with information from React. We can't update the state with an object
     *
     * Objects look like:
     * https://cdn.zappy.app/7f3ffc8c626d9c2b04d64a7f4048027b.png
     */
    if (typeof e.data === 'string') {
      setMessageFromChild(e.data);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', receiveMessageCallback);

    return () => window.removeEventListener('message', receiveMessageCallback);
  }, []);

  return (
    <div className="App">
      <h1>RechargeApps</h1>
      <div className="card">
        <button onClick={sendMessage}>Message to child</button>
      </div>
      <pre>Navigate to: {messageFromChild}</pre>
      <iframe
        ref={iframeRef}
        style={{ height: 600, width: 600, border: 'none' }}
        src={embeddedUrl}
      />
    </div>
  );
}

export default App;
