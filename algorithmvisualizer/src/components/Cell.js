import React, { useState, useEffect } from "react";
import { boardContext } from "./Board"; 
import { AiFillCaretRight } from "react-icons/ai";
import { RiFocus2Fill } from "react-icons/ri";/*bi BiDumbbell*/ 
import {BiDumbbell} from "react-icons/bi"
function Cell({row, column, className, ...props}) {
    const { board, updateCell, buttonState} = React.useContext(boardContext)
    let symbol = null
    const iconStyle = {
      fontSize: "5000%",
      /*color: "#0056b3",*/
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
        className += " weight"
         // symbol = <BiDumbbell style={iconStyle} />;
      }
    
    return (
            <div 
            onClick = {(event) => (buttonState.first || buttonState.second)? updateCell(row, column, event):null} 
            onMouseEnter = {(event) => (buttonState.third || buttonState.fourth)? updateCell(row, column, event): null}
            /*onClick = {(event) =>  updateCell(row, column, event)} 
            onMouseEnter = {(event) => updateCell(row, column, event)}*/
            className={className} {...props}>{symbol}
            </div>
        )
}
  
  
  export default Cell;
  