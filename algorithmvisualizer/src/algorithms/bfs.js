function bfs(startRow, startColumn, endRow, endColumn, board) {
    const numRows = 25;
    const numCols = 40;
  
    // Create a 2D array to track visited nodes and another for storing parents
    const visited = Array.from({ length: numRows }, () =>
      Array(numCols).fill(false)
    );
    const parents = Array.from({ length: numRows }, () =>
      Array(numCols).fill(null)
    );
    const visitedArray = []
    for(let i = 0; i < 25; i++){
        for(let j = 0; j < 40; j++){
            if(board[i][j].border)visited[i][j] = true;
        }
    }
    const queue = [{ row: startRow, column: startColumn }];
    const directions = [
      { row: -1, column: 0 }, 
      { row: 1, column: 0 },  
      { row: 0, column: -1 }, 
      { row: 0, column: 1 },  
    ];
  
    let found = false;
    while (queue.length > 0) {
      const { row, column } = queue.shift();
  
      if (row === endRow && column === endColumn) {
        found = true;
        break;
      }
  
      for (const dir of directions) {
        const newRow = row + dir.row;
        const newColumn = column + dir.column;
  
        if (
          newRow >= 0 &&
          newRow < numRows &&
          newColumn >= 0 &&
          newColumn < numCols &&
          !visited[newRow][newColumn]
        ) {
          visited[newRow][newColumn] = true;
          parents[newRow][newColumn] = { row, column };
          visitedArray.push({row: newRow, column: newColumn})
          queue.push({ row: newRow, column: newColumn });
        }
      }
    }
  
    // Reconstruct the best path from end to start
    const path = [];
    if (found) {
      let currentRow = endRow;
      let currentColumn = endColumn;
      while (currentRow !== startRow || currentColumn !== startColumn) {
        path.unshift({ row: currentRow, column: currentColumn });
        const parent = parents[currentRow][currentColumn];
        currentRow = parent.row;
        currentColumn = parent.column;
      }
      path.unshift({ row: startRow, column: startColumn });
    }
  
    return { visitedArray, path };
  }
  
  export default bfs;