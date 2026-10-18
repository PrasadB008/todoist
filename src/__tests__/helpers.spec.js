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

    it('produces ids that sort in time order', () => {
      const spy = jest.spyOn(Date.prototype, 'getTime');
      spy.mockReturnValue(1000000);
      const earlier = generatePushId();
      spy.mockReturnValue(2000000);
      const later = generatePushId();

      expect(earlier < later).toBe(true);
    });

    it('uses Math.random for the 12 random characters', () => {
      jest.spyOn(Date.prototype, 'getTime').mockReturnValue(5000000);
      const random = jest.spyOn(Math, 'random');

      random.mockReturnValue(0);
      expect(generatePushId().slice(8)).toBe('-'.repeat(12));

      jest.spyOn(Date.prototype, 'getTime').mockReturnValue(5000001);
      random.mockReturnValue(0.999);
      expect(generatePushId().slice(8)).toBe('z'.repeat(12));
    });

    it('generates different random parts at different times', () => {
      const spy = jest.spyOn(Date.prototype, 'getTime');
      spy.mockReturnValue(6000000);
      const first = generatePushId();
      spy.mockReturnValue(6000001);
      const second = generatePushId();

      expect(first.slice(8)).not.toBe(second.slice(8));
    });

    it('keeps ids unique and ordered within the same millisecond', () => {
      jest.spyOn(Date.prototype, 'getTime').mockReturnValue(7000000);
      jest.spyOn(Math, 'random').mockReturnValue(0);

      const first = generatePushId();
      const second = generatePushId();
      const third = generatePushId();

      expect(first.slice(0, 8)).toBe(second.slice(0, 8));
      expect(new Set([first, second, third]).size).toBe(3);
      expect(first < second).toBe(true);
      expect(second < third).toBe(true);
    });

    it('carries over when the last random character overflows', () => {
      jest.spyOn(Date.prototype, 'getTime').mockReturnValue(8000000);
      const random = jest.spyOn(Math, 'random').mockReturnValue(0);
      for (let i = 0; i < 11; i++) random.mockReturnValueOnce(0.5);
      random.mockReturnValueOnce(0.999);

      const first = generatePushId();
      const second = generatePushId();

      expect(first.slice(8)).toBe(`${'V'.repeat(11)}z`);
      expect(second.slice(8)).toBe(`${'V'.repeat(10)}W-`);
    });
  });
});
