const { db } = require('../server');

afterAll(() => {
  return new Promise((resolve, reject) => {
    db.close(err => (err ? reject(err) : resolve()));
  });
});

describe('Unit tests: DB operations', () => {
  let taskId;

  it('should insert a task into the DB', done => {
    db.run(`INSERT INTO tasks (title, description) VALUES (?, ?)`,
      ['Unit Task', 'Unit Desc'],
      function(err) {
        expect(err).toBeNull();
        expect(this.lastID).toBeGreaterThan(0);
        taskId = this.lastID;
        done();
      });
  });

  it('should read a task from the DB', done => {
    db.get(`SELECT * FROM tasks WHERE id = ?`, [taskId], (err, row) => {
      expect(err).toBeNull();
      expect(row).toBeDefined();
      expect(row.title).toBe('Unit Task');
      done();
    });
  });

  it('should update a task in the DB', done => {
    db.run(`UPDATE tasks SET completed = ? WHERE id = ?`, [1, taskId], function(err) {
      expect(err).toBeNull();
      expect(this.changes).toBe(1);
      done();
    });
  });

  it('should delete a task from the DB', done => {
    db.run(`DELETE FROM tasks WHERE id = ?`, [taskId], function(err) {
      expect(err).toBeNull();
      expect(this.changes).toBe(1);
      done();
    });
  });
});
