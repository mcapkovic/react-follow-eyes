import React, { useState } from "react";
import Face1 from "./Face1";
import Face2 from "./Face2";

import "./App.css";
import './face1.css';
import './face2.css';

function App() {
  const [face, setFace] = useState('face1');

  return (
    <div className="App">
      <div className='controls'>
        <button onClick={() => setFace('face1')}>face1</button>
        <button onClick={() => setFace('face2')}>face2</button>

      </div>
      {face === 'face1' && <Face1 />}
      {face === 'face2' && <Face2 />}

    </div>
  );
}

export default App;
