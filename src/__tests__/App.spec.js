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

  it('keeps the task list inside the darkmode container and toggles it', () => {
    const { queryByTestId } = render(<App />);
    const application = queryByTestId('application');
    expect(application.contains(queryByTestId('tasks'))).toBeTruthy();

    const toggle = queryByTestId('dark-mode-action');
    expect(toggle.getAttribute('aria-checked')).toBe('false');

    fireEvent.click(toggle);
    expect(application.classList.contains('darkmode')).toBeTruthy();
    expect(toggle.getAttribute('aria-checked')).toBe('true');

    fireEvent.click(toggle);
    expect(application.classList.contains('darkmode')).toBeFalsy();
    expect(toggle.getAttribute('aria-checked')).toBe('false');
  });
});
