import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '~/app';

describe('GET /api/users', () => {
  it('should return a list of users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should filter users by name', async () => {
    const res = await request(app)
      .get('/api/users')
      .query({ filter: 'name=John' });
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((user: any) => {
      expect(user.name).toBe('John');
    });
  });
});
