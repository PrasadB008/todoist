import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Header } from '../components/layout/Header';

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({ selectedProject: 1 })),
  useProjectsValue: jest.fn(() => ({ projects: [] })),
}));

jest.mock('../hooks', () => ({
  useTasks: jest.fn(() => ({
    tasks: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
  })),
}));

beforeEach(cleanup);

describe('<Header />', () => {
  describe('Success', () => {
    it('renders the header component', () => {
      const { queryByTestId } = render(<Header />);
      expect(queryByTestId('header')).toBeTruthy();
    });

    it('renders the number of tasks in the header', () => {
      const { queryByTestId } = render(<Header />);
      expect(queryByTestId('task-counter').textContent).toBe('3');
    });

    it('renders the header component and activates dark mode using onClick', () => {
      const darkMode = false;
      const setDarkMode = jest.fn(() => !darkMode);

      const { queryByTestId } = render(
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      );
      expect(queryByTestId('header')).toBeTruthy();

      fireEvent.click(queryByTestId('dark-mode-action'));
      expect(setDarkMode).toHaveBeenCalledWith(true);
    });

    it('renders the header component and set quick add task to true using onClick', () => {
      const darkMode = false;

      const { queryByTestId } = render(<Header darkMode={darkMode} />);
      expect(queryByTestId('header')).toBeTruthy();

      fireEvent.click(queryByTestId('quick-add-task-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();
    });
  });
});
