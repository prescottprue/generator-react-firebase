/* global describe before */
import path from 'path'
// import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import { checkForEachFile } from '../utils'
import utils from '../../generators/app/utils'

describe('generator-react-firebase:app utils', () => {
  describe('firebaseUrlValidate', () => {
    describe('exists', () => {
      expect(utils).to.respondTo('firebaseUrlValidate')
    })
    describe('handles valid input', () => {
      expect(utils.firebaseUrlValidate('asdfasdf'))
    })
    describe('handles no input', () => {
      expect(utils.firebaseUrlValidate())
    })
    describe('warns when input contains http or firebaseio.com', () => {
      expect(utils.firebaseUrlValidate('http:'))
    })
    describe('warns when invalid input contains symbols', () => {
      expect(utils.firebaseUrlValidate(':!!!  '))
    })
  })
})
