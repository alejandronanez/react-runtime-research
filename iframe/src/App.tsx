import {
  IframeHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import './App.css';

type AppProps = {
  embeddedUrl: string;
  embeddedSuccessEvent: string;
  embeddedCancelEvent: string;
};
function App({
  embeddedUrl,
  embeddedCancelEvent,
  embeddedSuccessEvent,
}: AppProps) {
  const [messageFromChild, setMessageFromChild] = useState('');
  const iFrameRef = useRef<any>(null);
  const sendMessage = () => {
    if (!iFrameRef.current) return;

    iFrameRef.current.contentWindow.postMessage('something', embeddedUrl);
  };

  const callback = useCallback((e: any) => {
    if (typeof e.data === 'string') {
      setMessageFromChild(e.data);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', callback);

    return () => window.removeEventListener('message', callback);
  }, []);

  return (
    <div className="App">
      <h1>RechargeApps</h1>
      <div className="card">
        <button onClick={() => sendMessage()}>Message to child</button>
      </div>
      <pre>Outside events: {messageFromChild}</pre>
      <iframe
        ref={iFrameRef}
        style={{ height: 500, width: 600 }}
        src={embeddedUrl}
      />
    </div>
  );
}

export default App;
