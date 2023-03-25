import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 0.5 }) {
  const [board, setBoard] = useState(createBoard());

  function createBoard() {
    let initialBoard = [];
    let row;
    let lightState;

    for (let i = 0; i < nrows; i++) {
      row = (Array(ncols).fill(null)).map((val, idx) => {
        let randomNum = Math.random();
        (randomNum < chanceLightStartsOn ? lightState = true : lightState = false);
        return { 'lightState': lightState, 'coord': `${i}-${idx}` }
      })
      initialBoard.push(row)
    };

    return initialBoard;
  }



  function hasWon() {
    let lights = board.some(arr => {
      return arr.some(({ lightState }) => lightState === true);
    })
    if (lights) return false;
    else return true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      const boardCopy = [...board]


      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {

          boardCopy[y][x].lightState = !boardCopy[y][x].lightState;
        }
      };
      flipCell(y, x, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y, x - 1, boardCopy);
      return boardCopy;
    });
  }

  if (hasWon()) {
    return (
      <div>You Won!</div>
    )
  } else {
    return (

      < div >
        {
          board.map(arr => {
            return (
              <tr>
                {arr.map(({ lightState, coord }) => {
                  return <Cell flipCellsAroundMe={() => flipCellsAround(coord)} isLit={lightState} />
                })}
              </tr>
            )
          })
        }
      </div >
    )



  }

}

export default Board;
