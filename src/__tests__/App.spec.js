import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { App } from '../App';

beforeEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe('<App />', () => {
  it('toggles dark mode on and off and remembers the choice', () => {
    const { queryByTestId } = render(<App />);
    const app = queryByTestId('application');
    const toggle = queryByTestId('dark-mode-action');

    fireEvent.click(toggle);
    expect(app.classList.contains('darkmode')).toBeTruthy();
    expect(toggle.getAttribute('aria-pressed')).toBe('true');
    expect(window.localStorage.getItem('darkMode')).toBe('true');

    fireEvent.click(toggle);
    expect(app.classList.contains('darkmode')).toBeFalsy();
    expect(toggle.getAttribute('aria-pressed')).toBe('false');
    expect(window.localStorage.getItem('darkMode')).toBe('false');
  });

  it('starts in dark mode when it was saved earlier', () => {
    window.localStorage.setItem('darkMode', 'true');
    const { queryByTestId } = render(<App />);
    expect(
      queryByTestId('application').classList.contains('darkmode')
    ).toBeTruthy();
  });

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
});
