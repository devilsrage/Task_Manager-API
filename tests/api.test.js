const request = require('supertest');
const { app, db } = require('../server');

afterAll(() => {
  return new Promise((resolve, reject) => {
    db.close(err => (err ? reject(err) : resolve()));
  });
});

describe('API tests', () => {
  let createdTaskId;

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'API Task', description: 'From test' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('API Task');
    createdTaskId = res.body.id;
  });

  it('should fail to create a task without title', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ description: 'Missing title' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Title is required');
  });

  it('should get all tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a task by ID', async () => {
    const res = await request(app).get(`/api/tasks/${createdTaskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdTaskId);
  });

  it('should return 404 for invalid task ID on GET', async () => {
    const res = await request(app).get('/api/tasks/99999');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Task not found');
  });

  it('should update a task', async () => {
    const res = await request(app)
      .put(`/api/tasks/${createdTaskId}`)
      .send({ title: 'Updated Task', description: 'Updated desc', completed: 1 });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Task updated');
  });

  it('should return 404 for invalid task ID on PUT', async () => {
    const res = await request(app)
      .put('/api/tasks/99999')
      .send({ title: 'No Task', description: 'No Desc', completed: 1 });
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Task not found');
  });

  it('should delete a task', async () => {
    const res = await request(app).delete(`/api/tasks/${createdTaskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Task deleted');
  });

  it('should return 404 for invalid task ID on DELETE', async () => {
    const res = await request(app).delete('/api/tasks/99999');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Task not found');
  });
});
