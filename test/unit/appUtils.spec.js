import path from 'path'
import helpers from 'yeoman-test'
import { checkForEachFile } from '../utils'
import utils from '../../generators/app/utils'

describe('generator-react-firebase:app utils', () => {
  describe('validateFirebaseName', () => {
    describe('exists', () => {
      expect(utils).to.respondTo('validateFirebaseName')
    })
    describe('handles valid input', () => {
      expect(utils.validateFirebaseName('asdfasdf'))
    })
    describe('handles no input', () => {
      expect(utils.validateFirebaseName())
    })
    describe('warns when input contains http or firebaseio.com', () => {
      expect(utils.validateFirebaseName('http:'))
    })
    describe('warns when invalid input contains symbols', () => {
      expect(utils.validateFirebaseName(':!!!  '))
    })
  })
})
