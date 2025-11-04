import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * Scoreboard
 * Displays cumulative wins for X and O, and number of draws.
 */
function Scoreboard({ scores }) {
  const { xWins = 0, oWins = 0, draws = 0 } = scores || {};
  return (
    <div className="scoreboard" aria-label="Scoreboard">
      <span className="badge x" aria-label={`X wins: ${xWins}`}>
        X: {xWins}
      </span>
      <span className="badge o" aria-label={`O wins: ${oWins}`}>
        O: {oWins}
      </span>
      <span className="badge d" aria-label={`Draws: ${draws}`}>
        Draws: {draws}
      </span>
    </div>
  );
}

Scoreboard.propTypes = {
  scores: PropTypes.shape({
    xWins: PropTypes.number,
    oWins: PropTypes.number,
    draws: PropTypes.number,
  }).isRequired,
};

export default Scoreboard;
