import {
  getTitle,
  getCollatedTitle,
  collatedTasksExist,
  generatePushId,
} from '../helpers';

describe('helpers', () => {
  describe('getTitle', () => {
    const projects = [
      { projectId: '1', name: 'Work' },
      { projectId: '2', name: 'Home' },
    ];

    it('returns the project matching the projectId', () => {
      expect(getTitle(projects, '2')).toEqual({ projectId: '2', name: 'Home' });
    });

    it('returns undefined when no project matches', () => {
      expect(getTitle(projects, '99')).toBeUndefined();
    });

    it('returns undefined for an empty list', () => {
      expect(getTitle([], '1')).toBeUndefined();
    });
  });

  describe('getCollatedTitle', () => {
    const collated = [
      { key: 'INBOX', name: 'Inbox' },
      { key: 'TODAY', name: 'Today' },
    ];

    it('returns the entry matching the key', () => {
      expect(getCollatedTitle(collated, 'TODAY')).toEqual({
        key: 'TODAY',
        name: 'Today',
      });
    });

    it('returns undefined when the key is unknown', () => {
      expect(getCollatedTitle(collated, 'NEXT_7')).toBeUndefined();
    });
  });

  describe('collatedTasksExist', () => {
    it.each(['INBOX', 'TODAY', 'NEXT_7'])('finds the %s collated view', key => {
      expect(collatedTasksExist(key)).toBeDefined();
      expect(collatedTasksExist(key).key).toBe(key);
    });

    it('returns undefined for a regular project id', () => {
      expect(collatedTasksExist('1')).toBeUndefined();
    });
  });

  describe('generatePushId', () => {
    const PUSH_CHARS =
      '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('returns a 20 character string made of push characters', () => {
      const id = generatePushId();

      expect(typeof id).toBe('string');
      expect(id).toHaveLength(20);
      id.split('').forEach(char => expect(PUSH_CHARS).toContain(char));
    });

    it('encodes the current time in the first 8 characters', () => {
      jest.spyOn(Date.prototype, 'getTime').mockReturnValue(0);
      expect(generatePushId().slice(0, 8)).toBe('--------');

      Date.prototype.getTime.mockReturnValue(64);
      expect(generatePushId().slice(0, 8)).toBe('------0-');

      Date.prototype.getTime.mockReturnValue(66);
      expect(generatePushId().slice(0, 8)).toBe('------01');
    });

    it('produces different ids when called at the same time', () => {
      jest.spyOn(Date.prototype, 'getTime').mockReturnValue(1000000);

      expect(generatePushId()).not.toBe(generatePushId());
    });

    it('produces ids that sort in creation order within the same millisecond', () => {
      jest.spyOn(Date.prototype, 'getTime').mockReturnValue(3000000);

      const ids = Array.from({ length: 200 }, () => generatePushId());

      expect([...ids].sort()).toEqual(ids);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('produces ids that sort in time order', () => {
      const spy = jest.spyOn(Date.prototype, 'getTime');
      spy.mockReturnValue(1000000);
      const earlier = generatePushId();
      spy.mockReturnValue(2000000);
      const later = generatePushId();

      expect(earlier < later).toBe(true);
    });

    it('generates unique, ordered ids within the same millisecond', () => {
      jest.spyOn(Date.prototype, 'getTime').mockReturnValue(3000000);
      const ids = Array.from({ length: 200 }, () => generatePushId());

      expect(new Set(ids).size).toBe(ids.length);
      expect(ids).toEqual([...ids].sort());
    });

    it('does not leave the random suffix as only dashes', () => {
      jest.spyOn(Date.prototype, 'getTime').mockReturnValue(4000000);

      expect(generatePushId().slice(8)).not.toBe('------------');
    });
  });
});
