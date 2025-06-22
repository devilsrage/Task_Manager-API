const { app, db } = require('../server');
const request = require('supertest');

afterAll(() => {
  return new Promise((resolve, reject) => {
    db.close(err => (err ? reject(err) : resolve()));
  });
});

describe('Integration tests: DB + API', () => {
  let id;

  it('API should create task and DB should contain it', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Integration Task', description: 'Integration Desc' });
    expect(res.statusCode).toBe(201);
    id = res.body.id;

    db.get(`SELECT * FROM tasks WHERE id = ?`, [id], (err, row) => {
      expect(err).toBeNull();
      expect(row).toBeDefined();
      expect(row.title).toBe('Integration Task');
    });
  });

  it('DB should update task and API should reflect it', done => {
    db.run(`UPDATE tasks SET completed = 1 WHERE id = ?`, [id], function(err) {
      expect(err).toBeNull();
      request(app)
        .get(`/api/tasks/${id}`)
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.body.completed).toBe(1);
          done();
        });
    });
  });

  it('DB should delete task and API should 404 on it', done => {
    db.run(`DELETE FROM tasks WHERE id = ?`, [id], function(err) {
      expect(err).toBeNull();
      request(app)
        .get(`/api/tasks/${id}`)
        .then(res => {
          expect(res.statusCode).toBe(404);
          done();
        });
    });
  });
});
