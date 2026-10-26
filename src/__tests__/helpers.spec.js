import {
  getTitle,
  getCollatedTitle,
  collatedTasksExist,
  generatePushId,
  averageTaskCount,
  firstTaskName,
} from '../helpers';

describe('helpers', () => {
  describe('averageTaskCount', () => {
    it('returns the total task count divided by the number of projects', () => {
      const projects = [{ taskCount: 2 }, { taskCount: 4 }, { taskCount: 6 }];

      expect(averageTaskCount(projects)).toBe(4);
    });
  });

  describe('firstTaskName', () => {
    it('returns the name of the first task', () => {
      expect(firstTaskName([{ name: 'Buy milk' }, { name: 'Walk dog' }])).toBe(
        'Buy milk'
      );
    });
  });

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

    it('uses Math.random for the 12 random characters', () => {
      jest.spyOn(Date.prototype, 'getTime').mockReturnValue(5000);
      const random = jest.spyOn(Math, 'random').mockReturnValue(0);
      expect(generatePushId().slice(8)).toBe('-'.repeat(12));

      Date.prototype.getTime.mockReturnValue(6000);
      random.mockReturnValue(0.999);
      expect(generatePushId().slice(8)).toBe('z'.repeat(12));
    });

    it('gives different random parts at different times', () => {
      const time = jest.spyOn(Date.prototype, 'getTime');
      time.mockReturnValue(7000);
      const first = generatePushId();
      time.mockReturnValue(8000);
      const second = generatePushId();

      expect(first.slice(8)).not.toBe(second.slice(8));
    });

    it('keeps ids unique and ordered within the same millisecond', () => {
      jest.spyOn(Date.prototype, 'getTime').mockReturnValue(9000);
      const ids = [generatePushId(), generatePushId(), generatePushId()];

      expect(new Set(ids).size).toBe(3);
      expect([...ids].sort()).toEqual(ids);
    });

    it('carries into the previous position when a character is at max', () => {
      jest.spyOn(Date.prototype, 'getTime').mockReturnValue(10000);
      const random = jest.spyOn(Math, 'random').mockReturnValue(0);
      for (let n = 0; n < 11; n += 1) {
        random.mockReturnValueOnce(0);
      }
      random.mockReturnValueOnce(0.999);
      const first = generatePushId();
      const second = generatePushId();

      expect(first.slice(8)).toBe(`${'-'.repeat(11)}z`);
      expect(second.slice(8)).toBe(`${'-'.repeat(10)}0-`);
    });

    it('produces ids that sort in time order', () => {
      const spy = jest.spyOn(Date.prototype, 'getTime');
      spy.mockReturnValue(1000000);
      const earlier = generatePushId();
      spy.mockReturnValue(2000000);
      const later = generatePushId();

      expect(earlier < later).toBe(true);
    });
  });
});
