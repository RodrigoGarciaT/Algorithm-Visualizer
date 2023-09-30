import React, { useState, useEffect } from "react";
import { boardContext } from "./Board"; 
import { AiFillCaretRight } from "react-icons/ai";
import { RiFocus2Fill } from "react-icons/ri";/*bi BiDumbbell*/ 
import {BiDumbbell} from "react-icons/bi"
function Cell({row, column, className, ...props}) {
    const { board, updateCell, buttonState, setClicked} = React.useContext(boardContext)
    const [mouseIsDown, setMouseIsDown] = useState(false);
    let symbol = null
    const iconStyle = {
      fontSize: "200%",
    };

    if (board[row][column].target) {
      symbol = <RiFocus2Fill style={iconStyle} />;
      }   
    if (board[row][column].start) {
      symbol = <AiFillCaretRight style={iconStyle} />;
      }
    if (board[row][column].border) {
        className += " border"
      }  
    if (board[row][column].weight) { 
         symbol = <BiDumbbell style={iconStyle} />;
      }
    if (board[row][column].visited) { 
        className += " visited"
      }
    if (board[row][column].isPath) { 
        className = "grid-item" + " isPath"
      }

      const handleMouseDown = (event) => {
        event.stopPropagation();
        setClicked(true)
        setMouseIsDown(() => true)
      }
    
      const handleMouseUp = (event) => {
        event.stopPropagation();
        setClicked(false)
        setMouseIsDown(()=>false)
       }

       useEffect(() =>{
        if(mouseIsDown){
          updateCell(row, column, 1)
        }
       },[mouseIsDown])
    return (
            <div 
            onMouseDown={handleMouseDown}
            onMouseUp = {handleMouseUp}
            onClick = {() => updateCell(row, column, 1)} 
            onMouseEnter = {() => (/*buttonState.third || buttonState.fourth*/true)? updateCell(row, column, 0): null}
            className={className} {...props}>{symbol}
            </div>
        )
}
  
  
  export default Cell;
  