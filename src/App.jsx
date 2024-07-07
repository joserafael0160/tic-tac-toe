import { useState } from "react"
import confetti from "canvas-confetti"
import { find_winner } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"
import { TurnSection } from "./components/TurnSection"
import { BoardSection } from "./components/BoardSection"
import { saveGameToStorage, resetGameStorage } from "./logic/storage"

export const TURNS = {
  X: "❌",
  O: "⚪"
}

function App() {
  const resetGame = () => {
   setBoard(Array(3).fill(Array(3).fill(null)))
   setTurn(TURNS.X)
   setWinner(null)
   resetGameStorage()
  }
  const [board, setBoard] = useState(()=>{
    const boardFrontStorage = window.localStorage.getItem("board")
    return boardFrontStorage ? JSON.parse(boardFrontStorage) : Array(3).fill(Array(3).fill(null))
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn")
    return turnFromStorage ?? TURNS.X
  })

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

    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    
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
      
      <BoardSection board={board} updateBoard={updateBoard}/>
      <TurnSection turn={turn}/>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
