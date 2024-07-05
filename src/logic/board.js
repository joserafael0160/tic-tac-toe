export const find_winner = (board) => {
  const size = 3

  // Verificación de filas
  for (let i = 0; i < size; i++) {
    if (board[i][0] && board[i].every((cell) => cell === board[i][0])) {
      return board[i][0]
    }
  }

  // Verificación de columnas
  for (let j = 0; j < size; j++) {
    if (board[0][j] && board.every((row) => row[j] === board[0][j])) {        
      return board[0][j]
    }
  }

  // Verificación de diagonales
  if (board[0][0] && board.every((row, i) => row[i] === board[0][0])) {
    return board[0][0]
  }
  if (board[0][size - 1] && board.every((row, i) => row[size - 1 - i] === board[0][size - 1])) {
    return board[0][size - 1]
  }

  return null; // No hay ganador

}
