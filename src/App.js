import React, { useState } from "react";
import Face0 from './Face0';
import Face1 from "./Face1";
import Face2 from "./Face2";
import Face3 from "./Face3";

import "./App.css";
import "./face1.css";
import "./face2.css";
import "./face3.css";
import "./face0.css";

function App() {
  const [face, setFace] = useState("face3");

  return (
    <div className="App">
      <div className="controls">
        <p>div + js</p>
        <button onClick={() => setFace("face0")}>face0</button>
        <button onClick={() => setFace("face1")}>face1</button>
        <button onClick={() => setFace("face2")}>face2</button>
        <hr />
        <p>svg + js</p>
        <button onClick={() => setFace("face3")}>face3</button>
      </div>
      {face === "face0" && <Face0 />}
      {face === "face1" && <Face1 />}
      {face === "face2" && <Face2 />}
      {face === "face3" && <Face3 />}
    </div>
  );
}

export default App;
