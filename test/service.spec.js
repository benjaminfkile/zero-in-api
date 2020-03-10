require('dotenv').config()
const service = require('../src/router/service')
const { expect } = require('chai')
const knex = require('knex')
const chai = require('chai');
const assertArrays = require('chai-arrays');
chai.use(assertArrays);

describe(`Service object`, function () {

    let db

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.DATABASE_URL,
        })
    })

    after(() => db.destroy())

    describe(`getAllAddresses()`, () => {

        it(`resolves all addresses from 'addresses' table`, () => {

            return service.getAllAddresses(db)
                .then(actual => {
                    expect(actual).to.be.array();
                })
        })
    })
    describe(`getAllBuildings()`, () => {

        it(`resolves all buildings from 'building' table`, () => {

            return service.getAllBuildings(db)
                .then(actual => {
                    expect(actual).to.be.array();
                })
        })
    })
})