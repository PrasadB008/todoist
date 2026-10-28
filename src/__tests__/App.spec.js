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

  it('toggles dark mode on and off and remembers the choice', () => {
    const { queryByTestId, unmount } = render(<App />);
    const app = queryByTestId('application');
    const toggle = queryByTestId('dark-mode-action');

    expect(toggle.getAttribute('aria-pressed')).toBe('false');

    fireEvent.click(toggle);
    expect(app.classList.contains('darkmode')).toBeTruthy();
    expect(toggle.getAttribute('aria-pressed')).toBe('true');

    unmount();
    const again = render(<App />);
    expect(
      again.queryByTestId('application').classList.contains('darkmode')
    ).toBeTruthy();

    fireEvent.click(again.queryByTestId('dark-mode-action'));
    expect(
      again.queryByTestId('application').classList.contains('darkmode')
    ).toBeFalsy();
  });
});
