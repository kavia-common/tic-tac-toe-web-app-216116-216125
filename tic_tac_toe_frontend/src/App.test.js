import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders title "Tic Tac Toe"', () => {
  render(<App />);
  expect(screen.getByText(/Tic Tac Toe/i)).toBeInTheDocument();
});

test('renders 9 squares', () => {
  render(<App />);
  const squares = screen.getAllByRole('gridcell');
  expect(squares).toHaveLength(9);
});

test('turn indicator toggles after two clicks', () => {
  render(<App />);
  // Initial turn should be X
  expect(screen.getByRole('status')).toHaveTextContent(/Turn:\s*X/i);

  const squares = screen.getAllByRole('gridcell');
  // Click empty square 0 by X
  fireEvent.click(squares[0]);
  // After X click and no win/draw, it should be O's turn
  expect(screen.getByRole('status')).toHaveTextContent(/Turn:\s*O/i);

  // Click empty square 1 by O
  fireEvent.click(squares[1]);
  expect(screen.getByRole('status')).toHaveTextContent(/Turn:\s*X/i);
});

test('new round clears the board', () => {
  render(<App />);
  const squares = screen.getAllByRole('gridcell');

  fireEvent.click(squares[0]); // X
  expect(squares[0]).toHaveTextContent('X');

  const newRoundBtn = screen.getByRole('button', { name: /new round/i });
  fireEvent.click(newRoundBtn);

  // After new round, all squares are empty
  squares.forEach((sq) => expect(sq).toHaveTextContent(''));
});
