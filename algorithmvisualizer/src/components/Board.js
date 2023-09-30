import Cell from './Cell'
import React, { useState, useEffect } from "react";
import { appContext } from "../App";
const boardContext = React.createContext()
export { boardContext }
function Board({rendererKey}) {
  const { buttonState, toggleButton, board, setBoard, setRerenderKey} = React.useContext(appContext)
  const [clicked, setClicked] = useState(false);

    function updateCell(row, column, wasClicked){
        setBoard(previousBoard =>{
            let updatedBoard = [...previousBoard]
            if ((buttonState.first|| buttonState.second) && (clicked || wasClicked)) {
                updatedBoard.forEach((boardRow) => {
                  boardRow.forEach((cell) => {
                    buttonState.first ? cell.target = false : cell.start = false;
                  });
                });
              }
            if(buttonState.first && wasClicked) updatedBoard[row][column].target = true;
            if(buttonState.second && wasClicked) updatedBoard[row][column].start = true;

            if(buttonState.first && !wasClicked && clicked) updatedBoard[row][column].target = true;
            if(buttonState.second && !wasClicked &&clicked) updatedBoard[row][column].start = true;

            if(buttonState.third && clicked) {
             updatedBoard[row][column].border = !updatedBoard[row][column].border 
            }
            if(buttonState.fourth && clicked) {
              updatedBoard[row][column].weight = !updatedBoard[row][column].weight 
            }

            if(buttonState.third && wasClicked && !clicked)updatedBoard[row][column].border = true
            if(buttonState.fourth && wasClicked && !clicked)updatedBoard[row][column].weight = true
            console.log(updatedBoard[row][column].border, ' ', clicked, ' ', row, ' ', column)
            setRerenderKey(prevKey =>{
              return prevKey + 1
            })
            return updatedBoard;
        });}

    
    return (
        <boardContext.Provider value = {{board, updateCell, buttonState, setClicked}}>
            <div className="grid-container">
                {board.map((row, rowIndex) =>
                row.map((cell, columnIndex) => (
                <Cell
                    rendererKey = {rendererKey}
                    row = {rowIndex}
                    column = {columnIndex}
                    className ="grid-item"
                    key = {String(rowIndex) + String(columnIndex)}
                />
                ))
            )}
        </div>
        </boardContext.Provider>
      );
    
}
  
  
  export default Board;
  