import fs from 'fs';
import { setupStrapi, cleanupStrapi } from './helpers/strapi';
import request from 'supertest';

beforeAll(async () => {
  await setupStrapi();
});

afterAll(async () => {
  await cleanupStrapi();
});

it('strapi is defined', async () => {
  await request(strapi.server.httpServer)
    .get('/api/consultations')
    .expect(200) // Expect response http code 200
    .then((data) => {
      expect(data.text).toBe('Hello World!'); // expect the response text
    });
});
