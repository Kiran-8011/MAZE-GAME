import { solveMaze } from './solveMaze';

export const generateSolvableMaze = (difficulty) => {
  const size = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30;
  let maze;
  let solution;

  do {
    maze = Array.from({ length: size }, () => Array(size).fill(0));

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        maze[i][j] = Math.random() > 0.7 ? 0 : 1; // 70% chance to be a path, 30% to be a wall
      }
    }

    maze[0][0] = 1;
    maze[size - 1][size - 1] = 1;

    solution = solveMaze(maze);
  } while (solution.length === 0);

  return { maze, solution };
};
