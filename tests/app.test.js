const request = require('supertest');
const app = require('../src/app');

describe('API basics', () => {
  it('GET / chal raha hai', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });

  it('bina token ke assets 401 dete hain', async () => {
    const res = await request(app).get('/api/assets');
    expect(res.statusCode).toBe(401);
  });

  it('unknown route 404 deta hai', async () => {
    const res = await request(app).get('/api/nope');
    expect(res.statusCode).toBe(404);
  });
});
