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

  it('renders the application using dark mode', () => {
    const { queryByTestId } = render(<App darkModeDefault />);
    expect(queryByTestId('application')).toBeTruthy();
    expect(
      queryByTestId('application').classList.contains('darkmode')
    ).toBeTruthy();
  });

  it('toggles dark mode on and off with the header switch', () => {
    const { queryByTestId } = render(<App />);
    const app = queryByTestId('application');
    const toggle = queryByTestId('dark-mode-action');

    expect(toggle.getAttribute('aria-checked')).toBe('false');

    fireEvent.click(toggle);
    expect(app.classList.contains('darkmode')).toBeTruthy();
    expect(toggle.getAttribute('aria-checked')).toBe('true');

    fireEvent.click(toggle);
    expect(app.classList.contains('darkmode')).toBeFalsy();
    expect(toggle.getAttribute('aria-checked')).toBe('false');
  });
});
