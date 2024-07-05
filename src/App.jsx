import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square"
import { find_winner } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"

const TURNS = {
  X: "❌",
  O: "⚪"
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
  
  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square.every((cell) => cell !== null))
  }

  const updateBoard = (rowIndex, colIndex) => {
    if (board[rowIndex][colIndex] !== null || winner) return 
    const newBoard = board.map((row) => [...row])

    newBoard[rowIndex][colIndex] = turn 
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    const newWinner = find_winner(newBoard)
    if(newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Start Again</button>
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

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
