import { useState } from "react"

const TURNS = {
  X: "x",
  O: "o"
}


const Square = ({children, isSelected, updateBoard, row, col}) => {
  const className = `square ${isSelected ? "is-selected" : "" }`

  const handleClick = () => {
    updateBoard(row, col)
  }

  return (
    <div onClick={handleClick} className={className}>{children}</div>
  )
}

const find_winner = (board) => {
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

function App() {
  const resetGame = () => {
   setBoard(Array(3).fill(Array(3).fill(null)))
   setTurn(TURNS.X)
   setWinner(null)
  }
  const [board, setBoard] = useState(
     Array(3).fill(Array(3).fill(null))
  )

  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null)
    
  const updateBoard = (rowIndex, colIndex) => {
    if (board[rowIndex][colIndex] !== null || winner) return 
    const newBoard = board.map((row) => [...row])

    newBoard[rowIndex][colIndex] = turn 
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    const newWinner = find_winner(newBoard)
    if(newWinner) {
      setWinner(() => {
        return newWinner
      })
    }
  }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <section className="game">
        {
          board.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
              <Square 
                key={colIndex}
                updateBoard={updateBoard}
                row={rowIndex}
                col={colIndex}
                >
                {cell}
              </Square>
            )
            )
          )
        )
      }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false ? "Empate" : "Ganó: "
                }
              </h2>

              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
