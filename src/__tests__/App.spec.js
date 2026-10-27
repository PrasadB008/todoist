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

  it('wraps the task list in the dark mode container and toggles it', () => {
    const { queryByTestId } = render(<App />);
    const app = queryByTestId('application');
    expect(app.contains(queryByTestId('tasks'))).toBeTruthy();

    fireEvent.click(queryByTestId('dark-mode-action'));
    expect(app.classList.contains('darkmode')).toBeTruthy();
    expect(queryByTestId('dark-mode-action').getAttribute('aria-checked')).toBe('true');
    expect(app.contains(queryByTestId('tasks'))).toBeTruthy();

    fireEvent.click(queryByTestId('dark-mode-action'));
    expect(app.classList.contains('darkmode')).toBeFalsy();
    expect(queryByTestId('dark-mode-action').getAttribute('aria-checked')).toBe('false');
  });
});
