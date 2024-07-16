import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button id='' className="btn" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calcWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calcWinner(squares);
  let status;
  if (winner) {
    status = 'WINNER! : '+" "+ winner;
  } 
  else if (squares.every(square => square !== null)) {
    status = 'DRAW!';
  }
    else {
    status = (xIsNext ? 'X' : 'O') + " " + "'s Turn";
  }

  return (
    <>
    <h1 className='text-cyan-900 text-5xl font-extrabold underline'>Tic Tac Toe</h1>
    <div className=' top-64 left-1/2 absolute -translate-x-2/4 -translate-y-1/2'>     
      <div>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="clear-both">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="clear-both">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <div className=" ml-9 mt-20 text-lg text-cyan-950 text-ind">{status}</div>
    </div>
    </>
  );
}

export default function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove,setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];  
  

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext); 
  }

  function jumpTo(nextMove) {
  setCurrentMove(nextMove);
  setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares,move)=> {
    let description;
    if(move > 0){
      description = "Go to move #" + move;
    }
    else{
      description = "Go to Game Start";
    }
    return(
      <li key={move}>
        <div className='flex justify-end'>
        <button className='bg-cyan-200 px-4 py-2 text-cyan-950 rounded-full mr-6 w-44'
        onClick={() => jumpTo(move)}>{description}</button>
        </div>
      </li>
    );
  });
  return (  
    <div className="">
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div>
        <ul>{moves}</ul> 
      </div>
    </div>
  );
}

function calcWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];     
    }
  }                                               
  return null;
}
