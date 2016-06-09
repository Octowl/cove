/* jshint node: true, mocha: true */

// Instantiate all models
var expect = require('chai').expect;

var Sequelize = require('sequelize');

process.env.NODE_ENV = 'testing';

var db = require('../../../server/db');

var supertest = require('supertest');

function toPlainObject(instance) {
    return instance.get({
        plain: true
    });
}

describe('Users Route', function () {

    var app, User, user1, user2, agent;

    beforeEach('Sync DB', function () {
        return db.sync({
            force: true
        });
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        User = db.model('user');
    });

    beforeEach('Create a User', function (done) {
        return User.create({
                firstName: 'Lemon',
                lastName: 'Squeeze',
                email: 'thesqueeze@gmail.com',
                password: 'lemonade'
            })
            .then(function (u) {
                user1 = u;
                return User.create({
                    firstName: 'Orange',
                	lastName: 'YouGlad',
                	email: 'thatididnt@gmail.com',
                	password: 'saylemon'
                });
            })
            .then(function (u) {
                user2 = u;
                done();
            })
            .catch(done);
    });

    beforeEach('Create guest agent', function () {
        agent = supertest.agent(app);
    });

    afterEach('Sync DB', function () {
        return db.sync({
            force: true
        });
    });

    // describe("GET all", function () {

    //     it('gets all products', function (done) {
    //         agent.get('/api/products')
    //             .expect(200)
    //             .end(function (err, res) {
    //                 if (err) return done(err);
    //                 expect(res.body).to.be.instanceof(Array);
    //                 expect(res.body).to.have.length(2);
    //                 done();
    //             });
    //     });

    // });

    // describe("POST one", function (done) {

    //     it("creates a new product", function (done) {
    //         agent.post('/api/products')
    //         .send({
    //             name: "Shagel",
    //             description: "gel and things",
    //             price: 4.5,
    //             inventory: 8
    //         })
    //         .expect(201)
    //         .end(function (err, res) {
    //             if (err) return done(err);
    //             expect(res.body.description).to.equal("gel and things");
    //             expect(res.body.id).to.exist;
    //             Product.findById(res.body.id)
    //             .then(function (p) {
    //                 expect(p).to.not.be.null;
    //                 expect(res.body.id).to.eql(toPlainObject(p).id);
    //                 done();
    //             })
    //             .catch(done);
    //         });
    //     });

    // });

    describe("GET one by ID", function (done) {

        it("gets one user by ID", function (done) {
            agent.get('/api/users/' + user1.id)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.firstName).to.equal(user1.firstName);
                done()
            });
        });

        it("gets one that doesnt exist", function (done) {
            agent.get('/api/users/123456')
            .expect(404)
            .end(done);
        });

        it("gets one with an invalid ID", function (done) {
            agent.get('/api/users/mamainsqueezethelemon')
            .expect(500)
            .end(done);
        });

    });

    describe("PUT one", function (done) {

        it("updates one existing user", function (done) {
            agent.put('/api/users/' + user1.id)
            .send({
                firstName : 'Shagel'
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.firstName).to.equal("Shagel");
                expect(res.body.id).to.exist;
                User.findById(res.body.id)
                .then(function (u) {
                    expect(u).to.not.be.null;
                    expect(res.body.id).to.eql(toPlainObject(u).id);
                    done();
                })
                .catch(done);
            });
        });

        it("updates one that doesnt exist", function (done) {
            agent.put('/api/users/123456')
            .send({
                firstName : 'Shagel'
            })
            .expect(404)
            .end(done);
        });

        it("updates one with an invalid ID", function (done) {
            agent.put('/api/users/hfdjkslhfiul')
            .send({
                firstName : 'Shagel'
            })
            .expect(500)
            .end(done);
        });

    });


    describe("DELETE one", function (done) {

        it("deletes one existing user", function (done) {
            agent.delete('/api/users/' + user1.id)
            .expect(204)
            .end(function (err, res) {
                if (err) return done(err);
                User.findById(user1.id)
                .then(function (u) {
                    expect(u).to.be.null;
                    done();
                })
                .catch(done);
            });
        });

        it("deletes one that doesnt exist", function (done) {
            agent.delete('/api/users/123456')
            .expect(404)
            .end(done);
        });

        it("deletes one with an invalid ID", function (done) {
            agent.delete('/api/users/hfdjkslhfiul')
            .expect(500)
            .end(done);
        });

    });


});
