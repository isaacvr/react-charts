import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import Navbar from "./Navbar";

test('Navigation element should be rendered', () => {
  render(<Navbar />);

  const navElement = screen.getByRole('navigation');
  const links = navElement.querySelectorAll('a');

  expect(navElement).toBeTruthy();
  expect(navElement).toBeInTheDocument();
  
  expect(links).toBeTruthy();
  expect(links.length).toBeGreaterThan(0);
  links.forEach(a => expect(navElement).toContainElement(a));
});

test('Navigation items should be rendered', () => {
  render(<Navbar />);

  const navElement = screen.getByText('Sales');
  
  expect(navElement).toBeTruthy();
  expect(navElement).toBeInTheDocument();
});