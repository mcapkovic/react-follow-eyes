import React, { useState } from "react";
import Face0 from "./Face0";
import Face1 from "./Face1";
import Face2 from "./Face2";
import Face3 from "./Face3";

import "./App.css";
import "./face1.css";
import "./face2.css";
import "./face3.css";
import "./face0.css";

function Button(props) {
  const { active, ...buttonProps } = props;
  return (
    <button
      {...buttonProps}
      className={`button ${active ? "button--active" : ""}`}
    />
  );
}

function App() {
  const [face, setFace] = useState("face3");

  return (
    <div className="app">
      <div className="tab-strip">
        <div className="tab-strip__tabs">
          <p>div + js </p>
          <Button onClick={() => setFace("face0")} active={face === "face0"}>
            buggy eyes
          </Button>
          <Button onClick={() => setFace("face1")} active={face === "face1"}>
            blinking eyes
          </Button>
          <Button onClick={() => setFace("face2")} active={face === "face2"}>
            centering eyes
          </Button>
        </div>
        <div className="tab-strip__tabs">
          <p>svg + js</p>
          <Button onClick={() => setFace("face3")} active={face === "face3"}>
            face3
          </Button>
        </div>
      </div>
      {face === "face0" && <Face0 />}
      {face === "face1" && <Face1 />}
      {face === "face2" && <Face2 />}
      {face === "face3" && <Face3 />}
    </div>
  );
}

export default App;
