/* eslint-disable no-unused-vars */

process.env.NODE_ENV = 'test'
var chai = require('chai')
var sinon = require('sinon')
var path = require('path')

// globals
global.expect = chai.expect
global.assert = require('yeoman-assert')
global.chai = chai
global.testTempFolder = 'tmp'
global.testPath = path.join(__dirname, testTempFolder)
global.createFilePath = (name) => path.join(__dirname, testTempFolder, name)
