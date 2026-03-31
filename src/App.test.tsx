import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app title and theme toggle', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /budget control/i })).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /toggle light\/dark mode/i })
  ).toBeInTheDocument();
});
