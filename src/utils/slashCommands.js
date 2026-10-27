/**
 * Parse a /todo slash command from input text
 * @param {string} input - The input text to parse
 * @returns {string|null} - The task text if valid /todo command, null otherwise
 */
export const parseSlashCommand = (input) => {
  const todoMatch = input.match(/^\/todo\s+(.+)$/);
  if (todoMatch) {
    return todoMatch[1];
  }
  return null;
};
