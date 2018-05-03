'use Strict';

const chai = require('chai');  
const expect = require('chai').expect; 
chai.use(require('chai-http'));

const app = require('./index.js');
const base_url = 'localhost:3000';



describe('/api/login user login', function(){
	this.timeout(5000);

	 it('should return user loggedin successfully', function() {
	    return chai.request(app).post('/api/login')
	      .send({
	        email: 'test@gmail.com',
	        password : '1111'
	      })
	      .then(function(res) {
	        expect(res).to.have.status(200);
	        expect(res).to.be.json;
	        expect(res.body).to.be.an('object');
	        expect(res.body.status).to.equal(1);
	      });
  });
	 it('should return invalid credentials', function() {
	    return chai.request(app).post('/api/login')
	      .send({
	        email: 'test1@gmail.com',
	        password : '1111'
	      })
	      .then(function(res) {
	        expect(res).to.have.status(400);
	        expect(res).to.be.json;
	        expect(res.body).to.be.an('object');
	        expect(res.body.status).to.equal(0);
	      });
  });
	it('should return invalid email pattern', function() {
	    return chai.request(app).post('/api/login')
	      .send({
	        email: 'test',
	        password : '1111'
	      })
	      .then(function(res) {
	        expect(res).to.have.status(422);
	        expect(res).to.be.json;
	        expect(res.body).to.be.an('object');
	        expect(res.body.status).to.equal(0);
	      });
  });
	
		it('should return email is required', function() {
	    return chai.request(app).post('/api/login')
	      .send({
	        email: '',
	        password : '1111'
	      })
	      .then(function(res) {
	        expect(res).to.have.status(400);
	        expect(res).to.be.json;
	        expect(res.body).to.be.an('object');
	        expect(res.body.status).to.equal(0);
	      });
  });
		it('should return password is required', function() {
	    return chai.request(app).post('/api/login')
	      .send({
	        email: 'test@gmail.com',
	        password : ''
	      })
	      .then(function(res) {
	        expect(res).to.have.status(400);
	        expect(res).to.be.json;
	        expect(res.body).to.be.an('object');
	        expect(res.body.status).to.equal(0);
	      });
  });

});