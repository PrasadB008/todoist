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

  it('toggles dark mode on and off with the header button', () => {
    const { queryByTestId } = render(<App />);
    const button = queryByTestId('dark-mode-action');
    const app = queryByTestId('application');

    fireEvent.click(button);
    expect(app.classList.contains('darkmode')).toBeTruthy();
    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(document.body.classList.contains('darkmode-body')).toBeTruthy();

    fireEvent.click(button);
    expect(app.classList.contains('darkmode')).toBeFalsy();
    expect(button.getAttribute('aria-pressed')).toBe('false');
    expect(document.body.classList.contains('darkmode-body')).toBeFalsy();
  });
});
