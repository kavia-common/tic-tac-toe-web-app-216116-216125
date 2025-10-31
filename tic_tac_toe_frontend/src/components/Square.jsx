import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * Square
 * Represents a single square on the board as a button. Highlights when part of the winning line.
 */
function Square({ value, index, onClick, isWinning, disabled, currentPlayer }) {
  const label = value
    ? `Square ${index + 1}, ${value}`
    : `Square ${index + 1}, empty. ${currentPlayer} to move`;

  const classes = [
    'square',
    value === 'X' ? 'x' : '',
    value === 'O' ? 'o' : '',
    isWinning ? 'win' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classes}
      aria-label={label}
      aria-pressed={Boolean(value)}
      onClick={onClick}
      disabled={disabled}
      role="gridcell"
    >
      {value}
    </button>
  );
}

Square.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  isWinning: PropTypes.bool,
  disabled: PropTypes.bool,
  currentPlayer: PropTypes.oneOf(['X', 'O']),
};

export default Square;
