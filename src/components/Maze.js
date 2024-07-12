import React from 'react';
import '../styles/Maze.css';

const Maze = ({ maze, playerPosition, solution, showSolution }) => {
  const isCellInSolution = (row, col) => {
    return solution.some(cell => cell.row === row && cell.col === col);
  };

  return (
    <div>
      <div className="maze-container">
        {maze.map((row, rowIndex) => (
          <div className="maze-row" key={rowIndex}>
            {row.map((cell, colIndex) => {
              let className = 'maze-cell ';
              if (rowIndex === 0 && colIndex === 0) {
                className += 'entry-point';
              } else if (rowIndex === maze.length - 1 && colIndex === maze[0].length - 1) {
                className += 'exit-point';
              } else if (rowIndex === playerPosition.row && colIndex === playerPosition.col) {
                className += 'player';
              } else if (showSolution && isCellInSolution(rowIndex, colIndex)) {
                className += 'solution-path';
              } else {
                className += cell === 1 ? 'path' : 'wall';
              }

              return <div className={className} key={colIndex} />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Maze;
