//import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import React from 'react';

function Square({value, onClick}){
  return(
    <button className = "squareDesign" onClick={onClick} >
      {value}
    </button>
  )
}

function App () {
  const [grid, setGrid] = React.useState(Array(9).fill(null))
  const [isX, setIsX] = React.useState(true)

  const handleClick = (i) => {
    if (calculateWinner(grid) || grid[i]){
      return
    }
    
    grid[i] = isX ? 'X' : 'O'
    setGrid(grid)
    setIsX(!isX)
  }

  const winner = calculateWinner(grid)
  let status
  if (winner){
    status = `Winner: ${winner}`
  }
  else{
    status = `Next player: ${isX ? 'X' : 'O'}`
  }

  const handleRestart = () => {
    setIsX(true)
    setGrid(Array(9).fill(null))
  }

  const renderSquare = (i) => {
    return <Square value = {grid[i]} onClick = {() => handleClick(i)} />
  }

  return (
    <div className= "board" >

      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}       
      </div>
      <div className="status">{status}</div>
      <button className="restart" onClick={handleRestart}>Restart Game!</button>

    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

function calculateWinner(grid){
  const winningPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  for (let i=0; i<winningPatterns.length; i++){
    const [a,b,c] = winningPatterns[i]

    if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]){
      return grid[a]
    }
  }

  return null
}

export default App;
