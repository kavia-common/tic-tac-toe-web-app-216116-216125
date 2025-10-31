import { useState, useMemo } from 'react';
import './App.css';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import { calculateWinner, isDraw, getNextPlayer } from './utils/gameLogic';

/**
 * PUBLIC_INTERFACE
 * App
 * The main Tic Tac Toe application component. Manages game state, handles user interactions,
 * and renders the UI including the board, status, scoreboard, and controls.
 */
function App() {
  // Core game state
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [scores, setScores] = useState({ xWins: 0, oWins: 0, draws: 0 });

  // Derived state using pure game logic utilities
  const { winner, line: winningLine } = useMemo(() => calculateWinner(board), [board]);
  const draw = useMemo(() => !winner && isDraw(board), [board, winner]);

  // Status text for screen readers and visible label
  const gameStatus = useMemo(() => {
    if (winner === 'X') return 'X-wins';
    if (winner === 'O') return 'O-wins';
    if (draw) return 'draw';
    return 'in-progress';
  }, [winner, draw]);

  // PUBLIC_INTERFACE
  const handleSquareClick = (index) => {
    /**
     * Handle a click on a square:
     * - Ignore if game is over or square is occupied
     * - Place current player's mark
     * - Update winner/draw state and scores if round ends
     * - Otherwise toggle to next player
     */
    if (board[index] || winner) return;

    const nextBoard = board.slice();
    nextBoard[index] = currentPlayer;
    setBoard(nextBoard);

    const result = calculateWinner(nextBoard);
    if (result.winner) {
      setScores((s) =>
        result.winner === 'X'
          ? { ...s, xWins: s.xWins + 1 }
          : { ...s, oWins: s.oWins + 1 }
      );
      return; // keep current player shown; round is over
    }

    if (isDraw(nextBoard)) {
      setScores((s) => ({ ...s, draws: s.draws + 1 }));
      return;
    }

    setCurrentPlayer((p) => getNextPlayer(p));
  };

  // PUBLIC_INTERFACE
  const newRound = () => {
    /** Reset the board for a new round but keep scores and alternate starter */
    setBoard(Array(9).fill(null));
    // alternate starting player each round for fairness
    setCurrentPlayer((p) => (p === 'X' ? 'O' : 'X'));
  };

  // PUBLIC_INTERFACE
  const resetAll = () => {
    /** Reset both the board and the cumulative scores */
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setScores({ xWins: 0, oWins: 0, draws: 0 });
  };

  const statusText = winner
    ? `Winner: ${winner}`
    : draw
    ? 'Draw game'
    : `Turn: ${currentPlayer}`;

  return (
    <div className="app-root">
      <main className="card" aria-label="Tic Tac Toe Game Area">
        <header className="header">
          <h1 className="title">Tic Tac Toe</h1>
          <p className="subtitle">Two players. One board. First to three in a row wins.</p>
        </header>

        <section className="top-row">
          <div
            className={`status ${winner ? 'win' : draw ? 'draw' : ''}`}
            role="status"
            aria-live="polite"
          >
            {statusText}
          </div>
          <Scoreboard scores={scores} />
        </section>

        <Board
          board={board}
          onSquareClick={handleSquareClick}
          winningLine={winningLine}
          disabled={Boolean(winner) || draw}
          currentPlayer={currentPlayer}
        />

        <div className="buttons" aria-label="Game Controls">
          <button
            className="btn primary"
            onClick={newRound}
            aria-label="Start a new round"
          >
            New Round
          </button>
          <button
            className="btn secondary"
            onClick={resetAll}
            aria-label="Reset scores and board"
          >
            Reset Scores
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
