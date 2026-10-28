import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { App } from '../App';

jest.mock('../hooks', () => ({
  useTasks: jest.fn(() => ({ tasks: [], archivedTasks: [] })),
  useProjects: jest.fn(() => ({ projects: [], setProjects: jest.fn() })),
}));

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
    expect(document.body.classList.contains('darkmode')).toBeTruthy();
  });

  it('removes the dark mode class from the page body when unmounted', () => {
    const { unmount } = render(<App darkModeDefault />);
    unmount();
    expect(document.body.classList.contains('darkmode')).toBeFalsy();
  });
});
