describe('USER_ID', () => {
  const original = process.env.REACT_APP_USER_ID;

  afterEach(() => {
    if (original === undefined) {
      delete process.env.REACT_APP_USER_ID;
    } else {
      process.env.REACT_APP_USER_ID = original;
    }
    jest.resetModules();
  });

  it('is read from the REACT_APP_USER_ID environment variable', () => {
    process.env.REACT_APP_USER_ID = 'user-from-env';
    jest.resetModules();

    const { USER_ID } = require('../constants');

    expect(USER_ID).toBe('user-from-env');
  });

  it('does not fall back to a hardcoded id when the variable is unset', () => {
    delete process.env.REACT_APP_USER_ID;
    jest.resetModules();

    const { USER_ID } = require('../constants');

    expect(USER_ID).toBeUndefined();
  });
});
