import { parseSlashCommand } from '../utils/slashCommands';

describe('parseSlashCommand', () => {
  it('parses /todo command with text', () => {
    const result = parseSlashCommand('/todo Buy groceries');
    expect(result).toBe('Buy groceries');
  });

  it('parses /todo command with multiple words', () => {
    const result = parseSlashCommand('/todo Complete the project report');
    expect(result).toBe('Complete the project report');
  });

  it('returns null for /todo without text', () => {
    const result = parseSlashCommand('/todo');
    expect(result).toBeNull();
  });

  it('returns null for /todo with only spaces', () => {
    const result = parseSlashCommand('/todo   ');
    expect(result).toBeNull();
  });

  it('returns null for regular text without /todo', () => {
    const result = parseSlashCommand('Buy groceries');
    expect(result).toBeNull();
  });

  it('returns null for /todo in the middle of text', () => {
    const result = parseSlashCommand('Please /todo Buy groceries');
    expect(result).toBeNull();
  });

  it('parses /todo with special characters', () => {
    const result = parseSlashCommand('/todo Buy milk & eggs!');
    expect(result).toBe('Buy milk & eggs!');
  });
});
