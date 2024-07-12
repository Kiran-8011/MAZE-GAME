export const solveMaze = (maze) => {
  const numRows = maze.length;
  const numCols = maze[0].length;
  const solution = [];
  const visited = Array.from({ length: numRows }, () => Array(numCols).fill(false));

  const solve = (row, col) => {
    if (row < 0 || row >= numRows || col < 0 || col >= numCols || maze[row][col] === 0 || visited[row][col]) {
      return false;
    }

    solution.push({ row, col });
    visited[row][col] = true;

    if (row === numRows - 1 && col === numCols - 1) {
      return true; // Reached the end
    }

    // Try all possible moves
    const directions = [
      [0, 1], // Right
      [1, 0], // Down
      [0, -1], // Left
      [-1, 0] // Up
    ];

    for (const [dr, dc] of directions) {
      if (solve(row + dr, col + dc)) {
        return true;
      }
    }

    // Backtrack if no solution found
    solution.pop();
    return false;
  };

  if (solve(0, 0)) {
    return solution;
  } else {
    return [];
  }
};
