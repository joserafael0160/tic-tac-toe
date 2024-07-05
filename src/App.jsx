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
  let flag_x = false
  let flag_o = false
  for(let i = 0; i < 8; i++) {
    if(board[i] === "null") continue
    else if((board[i] === "x")) {
    }
  }
}

function App() {
  
  const [board, setBoard] = useState(
     Array(3).fill(Array(3).fill(null))
  )

  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null)
    
  const updateBoard = (rowIndex, colIndex) => {
    if (board[rowIndex][colIndex] !== null) return 
    const newBoard = board.map((row) => [...row])

    newBoard[rowIndex][colIndex] = turn 
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
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
    </main>
  )
}

export default App
