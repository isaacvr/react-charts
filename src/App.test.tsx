import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import App from "./App";

test('App element should be rendered', () => {
  render(<App />);
  
  let navbar = screen.getByRole('navigation');
  expect(navbar).toBeInTheDocument();

  let ul = screen.getByRole('list');
  expect(ul).toBeInTheDocument();
  expect(Array.from(ul.classList)).contain('controls');
  expect(ul.lastChild).toBeTruthy();

  // Dark mode toggler
  expect(ul.lastChild?.firstChild).toBeTruthy();
  expect(ul.lastChild?.firstChild).toHaveTextContent(/mode$/i);
});