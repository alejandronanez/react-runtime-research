import { useState } from 'react';
import './App.css';

type AppProps = {
  embeddedUrl: string;
};
function App({ embeddedUrl }: AppProps) {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>RechargeApps</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <iframe style={{ height: 240, width: 350 }} src={embeddedUrl} />
    </div>
  );
}

export default App;
