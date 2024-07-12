import React, { useState, useEffect } from 'react';
import Maze from './components/Maze';
import Player from './components/Player';
import './styles/App.css';  // Importing App-specific CSS
import { generateSolvableMaze } from './mazeGenerator';

const App = () => {
  const [difficulty, setDifficulty] = useState('medium');
  const [playerPosition, setPlayerPosition] = useState({ row: 0, col: 0 });
  const [mazeData, setMazeData] = useState(generateSolvableMaze(difficulty));
  const [startTime, setStartTime] = useState(Date.now());
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    setPlayerPosition({ row: 0, col: 0 });
  }, [mazeData]);

  const handleDifficultyChange = (event) => {
    const newDifficulty = event.target.value;
    setDifficulty(newDifficulty);
    generateNewMaze(newDifficulty);
  };

  const generateNewMaze = (newDifficulty = difficulty) => {
    const newMazeData = generateSolvableMaze(newDifficulty);
    setMazeData(newMazeData);
    setPlayerPosition({ row: 0, col: 0 });
    setStartTime(Date.now());
    setShowSolution(false);
  };

  const handlePositionChange = (newPosition) => {
    setPlayerPosition(newPosition);
  };

  const handleWin = () => {
    const endTime = Date.now();
    const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
    alert(`Congratulations! You've solved the maze in ${timeTaken} seconds 👍`);
    generateNewMaze(); 
  };

  const handleShowSolution = () => {
    setShowSolution(true);
    alert(`You lose!`);
  };

  const mazeSize = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30;
  
  return (
    <div className="app">
      <h1 className="title">Welcome to the Maze!</h1>
      
      <div className="controls">
        <label>Select Difficulty: </label>
        <select value={difficulty} onChange={handleDifficultyChange}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button onClick={() => generateNewMaze()}>Generate New Maze</button>
      </div>
      <Maze maze={mazeData.maze} playerPosition={playerPosition} solution={mazeData.solution} showSolution={showSolution} />
      <Player rows={mazeSize} cols={mazeSize} onPositionChange={handlePositionChange} maze={mazeData.maze} onWin={handleWin} />
      <button className="show-solution-button" onClick={handleShowSolution}>Show Solution</button>
    </div>
  );
};

export default App;




