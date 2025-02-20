import { useState } from 'react';
import CoinsWithTanstack from './components/CoinsWithTanstack.jsx';
import CoinsWithout from './components/CoinsWithout.jsx';
import './App.css';

function App() {
  const [show, setShow] = useState(true);

  return (
    <div>
      <button onClick={() => setShow((s) => !s)}>
        {show ? 'hide' : 'show'}
      </button>
      {show && <CoinsWithTanstack />}
      {/* {show && <CoinsWithout />} */}
    </div>
  );
}

export default App;
