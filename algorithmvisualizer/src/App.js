import './App.css';
import Navbar from './components/Navbar'
import Board from './components/Board'
import React from 'react';
import useToggle from "./hooks/useToggle";
const appContext = React.createContext()
export { appContext }
function App() {
  const [buttonState, toggleButton] = useToggle({
    initialValue: {first: 0, second: 0, third: 0, fourth: 0}, 
})
  return (
    <appContext.Provider value = {{buttonState, toggleButton}}>
      <div>
        <Navbar/>
        <Board/>
      </div>
    </appContext.Provider>
  );
}

export default App;
