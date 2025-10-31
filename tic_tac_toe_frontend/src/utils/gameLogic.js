 // PUBLIC_INTERFACE
export function calculateWinner(board) {
  /**
   * Determine if there's a winner on the board.
   * Returns:
   *  { winner: 'X' | 'O' | null, line: number[] } where line is the winning indices or []
   */
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // cols
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: [] };
}

// PUBLIC_INTERFACE
export function isDraw(board) {
  /**
   * Returns true if the board is full and there is no winner.
   */
  const { winner } = calculateWinner(board);
  return !winner && board.every((c) => c !== null);
}

// PUBLIC_INTERFACE
export function getNextPlayer(player) {
  /**
   * Toggle between 'X' and 'O'
   */
  return player === 'X' ? 'O' : 'X';
}
