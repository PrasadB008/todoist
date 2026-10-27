import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { App } from '../App';

beforeEach(cleanup); // clean meeeeeeeeee!

describe('<App />', () => {
  it('renders the application', () => {
    const { queryByTestId } = render(<App />);
    expect(queryByTestId('application')).toBeTruthy();
    expect(
      queryByTestId('application').classList.contains('darkmode')
    ).toBeFalsy();
  });

  it('toggles dark mode on and off with the header button', () => {
    const { queryByTestId } = render(<App />);
    const app = queryByTestId('application');
    const toggle = queryByTestId('dark-mode-action');

    fireEvent.click(toggle);
    expect(app.classList.contains('darkmode')).toBeTruthy();
    expect(toggle.getAttribute('aria-pressed')).toBe('true');

    fireEvent.click(toggle);
    expect(app.classList.contains('darkmode')).toBeFalsy();
    expect(toggle.getAttribute('aria-pressed')).toBe('false');
  });

  it('renders the application using dark mode', () => {
    const { queryByTestId } = render(<App darkModeDefault />);
    expect(queryByTestId('application')).toBeTruthy();
    expect(
      queryByTestId('application').classList.contains('darkmode')
    ).toBeTruthy();
  });
});
