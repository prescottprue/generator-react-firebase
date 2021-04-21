/* eslint-disable no-unused-vars */

process.env.NODE_ENV = 'test'
const chai = require('chai')
const sinon = require('sinon')
const path = require('path')

// globals
global.expect = chai.expect
global.assert = require('yeoman-assert')
global.chai = chai
global.testTempFolder = 'tmp'
global.testPath = path.join(__dirname, testTempFolder)
global.createFilePath = (name) => path.join(__dirname, testTempFolder, name)
