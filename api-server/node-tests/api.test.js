const request = require('supertest');
var app = require('../app').app;

/*Checking the status code's for the api's
Ensure they are returning status 200 ok.
*/
describe('GetProjects', () => {
  it('should return all projects as response', done => {
    request(app).get('/api/getProjects').expect(200).end(done);
  });
  it('should return specific project based on id', done => {
    request(app).get('/getProject/27').expect(200).end(done);
  });
  it('should return detail for project based on id', done => {
    request(app).get('/api/projectDetail/27').expect(200).end(done);
  });
});
describe('Users', () => {
  it('should return user info id', done => {
    request(app).get('/api/getUserInfo/15').expect(200).end(done);
  });
  it('should logout user', done => {
    request(app).get('/api/logout').expect(200).end(done);
  });
});
