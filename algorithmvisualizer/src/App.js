import './App.css';
import Navbar from './components/Navbar'
import Board from './components/Board'
import React, { useState, useEffect } from "react";
import useToggle from "./hooks/useToggle";
import bfs from "./algorithms/bfs"
const appContext = React.createContext()
export { appContext }
function App() {
// setting buttons
  const [buttonState, toggleButton] = useToggle({
    initialValue: {first: 0, second: 0, third: 0, fourth: 0}, 
})

// setting board
const numRows = 25;
const numCols = 40;

const defaultCell = { border: false, start: false, target: false, weight: false, visited: false };
const initialBoardState = Array.from({ length: numRows }, () =>
Array.from({ length: numCols }, () => ({ ...defaultCell }))
);
const [board, setBoard] = useState(initialBoardState)


// solving the board

function solveBfs(){
  let startRow, endRow
  let startColumn, endColumn

  for(let i = 0; i < 25; i++){
    for(let j = 0; j < 40; j++){
      if(board[i][j].start){
        startRow = i
        startColumn = j
      }

      if(board[i][j].target){
        endRow = i
        endColumn = j
      }
    }
  }
  const {visitedArray, path} = bfs(startRow,  startColumn, endRow, endColumn, board)
  animateAlgorithm(visitedArray, path)
}


const [rerenderKey, setRerenderKey] = useState(0);

function animateAlgorithm(visitedArray, path){
  // update algo nodes
  for(let i = 0; i< visitedArray.length + path.length; i++){
    setTimeout(()=>{
    let cell, newCell
    if(i < visitedArray.length){
      cell = board[visitedArray[i].row][visitedArray[i].column]
      newCell = {...cell, visited: true}
    }else{
      cell = board[path[i - visitedArray.length].row][path[i - visitedArray.length].column]
      newCell = {...cell, isPath: true}
    }
    setBoard(prevBoard =>{
      if(i < visitedArray.length) prevBoard[visitedArray[i].row][visitedArray[i].column] = newCell
      if(i >= visitedArray.length)prevBoard[path[i - visitedArray.length].row][path[i - visitedArray.length].column] = newCell
      return prevBoard
    })
    setRerenderKey(prevKey =>{
      return prevKey + 1
    })
  }, 15 * i)
  }
}

useEffect(() => {
}, [board])
  return (
    <appContext.Provider value = {{buttonState, toggleButton, board, setBoard, solveBfs, setRerenderKey}}>
      <div>
        <Navbar/>
        <Board rerenderKey/>
      </div>
    </appContext.Provider>
  );
}

export default App;
