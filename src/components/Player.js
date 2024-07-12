import React, { useState, useCallback, useEffect } from 'react';
import '../styles/Player.css';

const Player = ({ rows, cols, onPositionChange, maze, onWin }) => {
  const [position, setPosition] = useState({ row: 0, col: 0 });

  useEffect(() => {
    setPosition({ row: 0, col: 0 });
  }, [maze]);

  const movePlayer = useCallback((direction) => {
    let newRow = position.row;
    let newCol = position.col;

    switch (direction) {
      case 'up':
        newRow = Math.max(0, position.row - 1);
        break;
      case 'down':
        newRow = Math.min(rows - 1, position.row + 1);
        break;
      case 'left':
        newCol = Math.max(0, position.col - 1);
        break;
      case 'right':
        newCol = Math.min(cols - 1, position.col + 1);
        break;
      default:
        break;
    }

    // Ensure the new position is a path (white block), not a wall
    if (maze[newRow][newCol] === 1) {
      const newPosition = { row: newRow, col: newCol };
      setPosition(newPosition);
      onPositionChange(newPosition);

      // Check if player has reached the exit
      if (newRow === rows - 1 && newCol === cols - 1) {
        onWin();
      }
    }
  }, [position, rows, cols, maze, onPositionChange, onWin]);

  const handleKeyPress = useCallback((event) => {
    switch (event.key) {
      case 'ArrowUp':
        movePlayer('up');
        break;
      case 'ArrowDown':
        movePlayer('down');
        break;
      case 'ArrowLeft':
        movePlayer('left');
        break;
      case 'ArrowRight':
        movePlayer('right');
        break;
      default:
        break;
    }
  }, [movePlayer]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const resetPlayer = () => {
    const startPosition = { row: 0, col: 0 };
    setPosition(startPosition);
    onPositionChange(startPosition);
  };

  return (
    <div className="player-container">
      <div className="player-controls">
        <button onClick={() => movePlayer('up')}>&#9650;</button>
        <button onClick={() => movePlayer('down')}>&#9660;</button>
        <button onClick={() => movePlayer('left')}>&#9664;</button>
        <button onClick={() => movePlayer('right')}>&#9654;</button>
        <button onClick={resetPlayer}>Reset</button>
      </div>
      
      {/* <div className="player-position">
       Position: ({position.row + 1}, {position.col + 1})
      
      </div> */}
    </div>
  );
};

export default Player;



