describe('config', () => {
  const original = process.env.REACT_APP_USER_ID;

  afterEach(() => {
    if (original === undefined) delete process.env.REACT_APP_USER_ID;
    else process.env.REACT_APP_USER_ID = original;
    jest.resetModules();
  });

  it('reads USER_ID from REACT_APP_USER_ID', () => {
    process.env.REACT_APP_USER_ID = 'user-from-env';
    jest.resetModules();
    // eslint-disable-next-line global-require
    const { USER_ID } = require('../config');

    expect(USER_ID).toBe('user-from-env');
  });

  it('does not fall back to a hardcoded id when the variable is unset', () => {
    delete process.env.REACT_APP_USER_ID;
    jest.resetModules();
    // eslint-disable-next-line global-require
    const { USER_ID } = require('../config');

    expect(USER_ID).toBeUndefined();
  });
});
