import { useState } from 'react';
import './App.css';
import { DynamicSlot } from './dynamicSlot/DynamicSlot';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>RechargeApps</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <DynamicSlot />
    </div>
  );
}

export default App;
