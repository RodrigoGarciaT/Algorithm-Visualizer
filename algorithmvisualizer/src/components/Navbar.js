import { appContext } from "../App";
import React from "react";
function Navbar() {
  const { buttonState, toggleButton } = React.useContext(appContext)
 /* let buttonClass = "nav-button"
  if(buttonState.first){

  }*/
  return (
    <nav className ="navbar">
        <div className="nav-left">
            <span className="nav-logo">Algorithm visualizer</span>
        </div>
        <div className="nav-right">
            <button className="nav-button">Algorithms</button>
            <button onClick={() => toggleButton(1)} className={"nav-button" + (buttonState.first ? " selected" : "")}>Set Target</button>
            <button onClick={() => toggleButton(2)} className={"nav-button" + (buttonState.second ? " selected" : "")}>Set Start</button>
            <button onClick={() => toggleButton(3)} className={"nav-button" + (buttonState.third ? " selected" : "")}>Set Border</button>
            <button onClick={() => toggleButton(4)} className={"nav-button" + (buttonState.fourth ? " selected" : "")}>Set Weight</button>
        </div>
    </nav>
  );
}

export default Navbar;
