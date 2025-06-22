// Mock sqlite3's Database methods
const mockRun = jest.fn();
const mockGet = jest.fn();
const mockAll = jest.fn();
const mockClose = jest.fn();

let MockDatabase;

jest.mock('sqlite3', () => {
  MockDatabase = jest.fn(() => ({
    run: mockRun,
    get: mockGet,
    all: mockAll,
    close: mockClose
  }));

  return {
    verbose: () => ({
      Database: MockDatabase
    })
  };
});

const sqlite3 = require('sqlite3');
const db = new (sqlite3.verbose().Database)();  // Correct: use Database constructor from verbose

describe('Mocked DB Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should mock successful insert', done => {
    mockRun.mockImplementation((sql, params, cb) => cb(null));

    db.run(`INSERT INTO tasks (title, description) VALUES (?, ?)`,
      ['Mock Task', 'Mock Desc'],
      (err) => {
        expect(err).toBeNull();
        expect(mockRun).toHaveBeenCalled();
        done();
      });
  });

  it('should mock insert failure', done => {
    mockRun.mockImplementation((sql, params, cb) => cb(new Error('Mock insert error')));

    db.run(`INSERT INTO tasks (title, description) VALUES (?, ?)`,
      ['Mock Task', 'Mock Desc'],
      (err) => {
        expect(err).not.toBeNull();
        expect(err.message).toBe('Mock insert error');
        expect(mockRun).toHaveBeenCalled();
        done();
      });
  });

  it('should mock successful get', done => {
    mockGet.mockImplementation((sql, params, cb) => cb(null, { id: 1, title: 'Mock Task', description: 'Mock Desc', completed: 0 }));

    db.get(`SELECT * FROM tasks WHERE id = ?`, [1], (err, row) => {
      expect(err).toBeNull();
      expect(row).toBeDefined();
      expect(row.title).toBe('Mock Task');
      expect(mockGet).toHaveBeenCalled();
      done();
    });
  });

  it('should mock get failure', done => {
    mockGet.mockImplementation((sql, params, cb) => cb(new Error('Mock get error')));

    db.get(`SELECT * FROM tasks WHERE id = ?`, [1], (err, row) => {
      expect(err).not.toBeNull();
      expect(err.message).toBe('Mock get error');
      expect(mockGet).toHaveBeenCalled();
      done();
    });
  });

  it('should mock successful all', done => {
    mockAll.mockImplementation((sql, params, cb) => cb(null, [{ id: 1, title: 'Mock Task' }]));

    db.all(`SELECT * FROM tasks`, [], (err, rows) => {
      expect(err).toBeNull();
      expect(Array.isArray(rows)).toBe(true);
      expect(rows.length).toBe(1);
      expect(mockAll).toHaveBeenCalled();
      done();
    });
  });

  it('should mock all failure', done => {
    mockAll.mockImplementation((sql, params, cb) => cb(new Error('Mock all error')));

    db.all(`SELECT * FROM tasks`, [], (err, rows) => {
      expect(err).not.toBeNull();
      expect(err.message).toBe('Mock all error');
      expect(mockAll).toHaveBeenCalled();
      done();
    });
  });

  it('should mock successful update', done => {
    mockRun.mockImplementation((sql, params, cb) => cb(null));

    db.run(`UPDATE tasks SET completed = ? WHERE id = ?`, [1, 1], (err) => {
      expect(err).toBeNull();
      expect(mockRun).toHaveBeenCalled();
      done();
    });
  });

  it('should mock update failure', done => {
    mockRun.mockImplementation((sql, params, cb) => cb(new Error('Mock update error')));

    db.run(`UPDATE tasks SET completed = ? WHERE id = ?`, [1, 1], (err) => {
      expect(err).not.toBeNull();
      expect(err.message).toBe('Mock update error');
      expect(mockRun).toHaveBeenCalled();
      done();
    });
  });

  it('should mock successful delete', done => {
    mockRun.mockImplementation((sql, params, cb) => cb(null));

    db.run(`DELETE FROM tasks WHERE id = ?`, [1], (err) => {
      expect(err).toBeNull();
      expect(mockRun).toHaveBeenCalled();
      done();
    });
  });

  it('should mock delete failure', done => {
    mockRun.mockImplementation((sql, params, cb) => cb(new Error('Mock delete error')));

    db.run(`DELETE FROM tasks WHERE id = ?`, [1], (err) => {
      expect(err).not.toBeNull();
      expect(err.message).toBe('Mock delete error');
      expect(mockRun).toHaveBeenCalled();
      done();
    });
  });
});
