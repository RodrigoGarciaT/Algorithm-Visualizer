import { appContext } from "../App";
import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
function Navbar() {
  const { buttonState, toggleButton, solveAlgorithm, resetBoard, resetSolution } = React.useContext(appContext)
  const [currentAlgorithm, setCurrentAlgorithm] = useState("dijkstra")
  return (
    <nav className ="navbar">
        <div className="nav-left">
            <span className="nav-logo">Algorithm visualizer</span>
        </div>
        <div className="nav-right">
            <button onClick ={() => resetBoard()}className="nav-button">Reset Board</button>
            <button onClick ={() => resetSolution()}className="nav-button">Reset Solution</button>
            <button onClick = {() => solveAlgorithm(currentAlgorithm)} className = "nav-button solver">{"Visualize " + currentAlgorithm + "!"}</button>
            <div className ="dropdown">
              <button className ="dropbtn">Algorithm
              <FaCaretDown />
              </button>
              <div className="dropdown-content">
                <a href="#" onClick ={() =>setCurrentAlgorithm("bfs")}className="nav-buttons">Solve with BFS</a>
                <a href="#" onClick ={() =>setCurrentAlgorithm("dijkstra")} className="nav-buttons">Solve with Dijkstra</a>
              </div>
            </div>
            <button onClick={() => toggleButton(2)} className={"nav-button" + (buttonState.second ? " selected" : "")}>Set Start</button>
            <button onClick={() => toggleButton(1)} className={"nav-button" + (buttonState.first ? " selected" : "")}>Set Target</button>
            <button onClick={() => toggleButton(3)} className={"nav-button" + (buttonState.third ? " selected" : "")}>Set Border</button>
            <button onClick={() => toggleButton(4)} className={"nav-button" + (buttonState.fourth ? " selected" : "")}>Set Weight</button>
        </div>
    </nav>
  );
}

export default Navbar;
