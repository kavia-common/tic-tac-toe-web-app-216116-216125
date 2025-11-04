import PropTypes from 'prop-types';
import Square from './Square';

/**
 * PUBLIC_INTERFACE
 * Board
 * Renders the 3x3 grid of squares. Handles click forwarding to parent.
 */
function Board({ board, onSquareClick, winningLine = [], disabled = false, currentPlayer }) {
  return (
    <section className="board" aria-label="Game board" role="grid">
      {board.map((value, idx) => {
        const isWinning = winningLine?.includes(idx);
        const handleClick = () => onSquareClick(idx);
        return (
          <Square
            key={idx}
            value={value}
            index={idx}
            onClick={handleClick}
            isWinning={isWinning}
            disabled={disabled || Boolean(value)}
            currentPlayer={currentPlayer}
          />
        );
      })}
    </section>
  );
}

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])])).isRequired,
  onSquareClick: PropTypes.func.isRequired,
  winningLine: PropTypes.arrayOf(PropTypes.number),
  disabled: PropTypes.bool,
  currentPlayer: PropTypes.oneOf(['X', 'O']),
};

export default Board;
