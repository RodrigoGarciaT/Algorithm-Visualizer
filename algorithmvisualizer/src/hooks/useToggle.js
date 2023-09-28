import React from "react"

export default function useToggle({
    initialValue = {first: 0, second: 0, third: 0 ,fourth: 0}
}) {
    const [state, setState] = React.useState(initialValue)
            /*{first, second, third, fourth}*/
    function toggle (buttonToTurnOn) {
        setState((prevState) =>{
           /* return {
                ...prevState,
                [buttonToTurnOn]: prevState[buttonToTurnOn] === 1 ? 0 : 1
            };*/
            console.log("changing button state to ", buttonToTurnOn)
            if(buttonToTurnOn === 1)return {first: 1, second: 0, third: 0 ,fourth: 0};
            if(buttonToTurnOn === 2)return {first: 0, second: 1, third: 0 ,fourth: 0};
            if(buttonToTurnOn === 3)return {first: 0, second: 0, third: 1 ,fourth: 0};
            if(buttonToTurnOn === 4)return {first: 0, second: 0, third: 0 ,fourth: 1};
            return prevState;
        })
    }

    return [state, toggle]
}