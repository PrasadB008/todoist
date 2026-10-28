import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { App } from '../App';

beforeEach(() => {
  cleanup(); // clean meeeeeeeeee!
  window.localStorage.clear();
});

describe('<App />', () => {
  it('renders the application', () => {
    const { queryByTestId } = render(<App />);
    expect(queryByTestId('application')).toBeTruthy();
    expect(
      queryByTestId('application').classList.contains('darkmode')
    ).toBeFalsy();
  });

  it('renders the application using dark mode', () => {
    const { queryByTestId } = render(<App darkModeDefault />);
    expect(queryByTestId('application')).toBeTruthy();
    expect(
      queryByTestId('application').classList.contains('darkmode')
    ).toBeTruthy();
  });

  it('toggles dark mode on and off with the switch and remembers it', () => {
    const { queryByTestId } = render(<App />);
    const toggle = queryByTestId('dark-mode-action');
    const app = queryByTestId('application');

    expect(toggle.getAttribute('aria-checked')).toBe('false');

    fireEvent.click(toggle);
    expect(app.classList.contains('darkmode')).toBeTruthy();
    expect(toggle.getAttribute('aria-checked')).toBe('true');
    expect(window.localStorage.getItem('darkMode')).toBe('true');

    fireEvent.click(toggle);
    expect(app.classList.contains('darkmode')).toBeFalsy();
    expect(window.localStorage.getItem('darkMode')).toBe('false');
  });
});
