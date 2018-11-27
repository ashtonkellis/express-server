require('dotenv').config();

const superagent = require('superagent');
const { startServer, stopServer }  = require('../src/server');

const PORT = 4000;

const apiURL = `localhost:${PORT}`

beforeAll(() => startServer(PORT));
afterAll(stopServer)

describe('Server testing', () => {
  test('404 get to bad path', () => {
    expect.hasAssertions();
    return superagent.get(`${apiURL}/BADPATH`)
      .catch(err => {
        expect(err.status).toBe(404);
        expect(err.response.res.text).toContain('<h1>Error: 404 Not found</h1>');
      })
  })

  test.only('500 POST with bad JSON', () => {
    expect.hasAssertions();
    return superagent.post(`${apiURL}/save`)
      .catch(err => {
        expect(err.status).toBe(500);
      })
  })
  
  it('should ping pong', async () => {
    const response = await superagent.get(`${apiURL}/ping`)
    expect(response.text).toBe('pong');
  });

  it('should return hello', async () => {
    const response = await superagent.get(`${apiURL}/`)
    expect(response.text).toBe('hello');
  })

  test('POST /save returns JSON body', async () => {
    const data = { a: 1, b: 2, c: 3 };
    const response = await superagent.post(`${apiURL}/save`).send(data);
    expect(response.status).toBe(201);
    expect(response.text).toBe(JSON.stringify(data));
  })
})
