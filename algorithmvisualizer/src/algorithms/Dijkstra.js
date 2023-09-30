import bfs from "./bfs"

function dijkstra(startRow, startColumn, endRow, endColumn, board) {
    const numRows = 25;
    const numCols = 40;
  
    // Create a 2D array to track visited nodes and another for storing parents
    const visited = Array.from({ length: numRows }, () =>
      Array(numCols).fill(false)
    );
    const parents = Array.from({ length: numRows }, () =>
      Array(numCols).fill(null)
    );
    const visitedArray = [];
    const distance = Array.from({ length: numRows }, () =>
      Array(numCols).fill(Number.MAX_SAFE_INTEGER)
    );
  
    // Initialize the distance to the start node as 0
    distance[startRow][startColumn] = 0;
  
    const queue = [{ row: startRow, column: startColumn, dist: 0 }];
    const directions = [
      { row: -1, column: 0 },
      { row: 1, column: 0 },
      { row: 0, column: -1 }, 
      { row: 0, column: 1 }, 
    ];
  
    while (queue.length > 0) {
      // Sort the queue based on distance to implement Dijkstra's algorithm
      queue.sort((a, b) => a.dist - b.dist);
      const { row, column, dist } = queue.shift();
  
      if (row === endRow && column === endColumn) {
        break;
      }
  
      visited[row][column] = true;
      // visitedArray.push({ row, column });
  
      for (const dir of directions) {
        const newRow = row + dir.row;
        const newColumn = column + dir.column;
  
        if (
          newRow >= 0 &&
          newRow < numRows &&
          newColumn >= 0 &&
          newColumn < numCols &&
          !visited[newRow][newColumn] &&
          !board[newRow][newColumn].border
        ) {
          const newDist = dist + (board[newRow][newColumn].weight ? 5 : 1);
          if (newDist < distance[newRow][newColumn]) {
            distance[newRow][newColumn] = newDist;
            parents[newRow][newColumn] = { row, column };
            visitedArray.push({ row: newRow, column: newColumn });
            queue.push({ row: newRow, column: newColumn, dist: newDist });
          }
        }
      }
    }
  
    // Reconstruct the best path from end to start
    const path = [];
    let currentRow = endRow;
    let currentColumn = endColumn;
    while (currentRow !== startRow || currentColumn !== startColumn) {
      path.unshift({ row: currentRow, column: currentColumn });
      const parent = parents[currentRow][currentColumn];
      if(parent && parent.row != null){
        currentRow = parent.row;
        currentColumn = parent.column;
      }else{
        return bfs(startRow, startColumn, endRow, endColumn, board);
      }
    }
    path.unshift({ row: startRow, column: startColumn });
  
    return { visitedArray, path };
  }
  
  export default dijkstra;
  