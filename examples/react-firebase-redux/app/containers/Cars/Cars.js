import React, { Component, PropTypes } from 'react'

import './Cars.scss'

import { connect } from 'react-redux'
import { firebase, helpers } from 'redux-firebasev3'
const { isLoaded, isEmpty, pathToJS, dataToJS } = helpers

// Props decorators
@firebase([ 'cars' ])
@connect(
  ({fb}) => {
    console.log('fb:', fb)
    return {
      cars: dataToJS(fb, '/cars')
    }
  }
)
export default class Cars extends Component {
  static propTypes = {
    addCar: PropTypes.func
  }

  handleClick = () => {
    console.log('add car clicked')
    console.log('this.props', this.props)
  }

  render () {
    const { cars } = this.props
    const carsList = this.props.cars ? this.props.cars.map((car, i) =>
      (<li key={ i }>{ car.name } - { car.hp }</li>)
    ) : null
    return (
      <div className='Cars'>
        <h2>Cars</h2>
        <div className='ClassList'>
          { carsList }
          <button onClick={ this.handleClick.bind(this) }>Add tesla</button>
        </div>
      </div>
    )
  }
}
