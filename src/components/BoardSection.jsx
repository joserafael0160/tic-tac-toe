import { Square } from "./Square"
export function BoardSection({board, updateBoard}) {
    
  return (
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
          ))
        ))
        
      }
      
    </section>
  )
}
