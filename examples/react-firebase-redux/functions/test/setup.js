/* eslint-disable no-unused-vars */
process.env.NODE_ENV = 'test'

const chai = require('chai')
const sinon = require('sinon')
const functionsTest = require('firebase-functions-test')()

global.chai = chai
global.sinon = sinon
global.expect = chai.expect
global.assert = chai.assert
global.functionsTest = functionsTest
