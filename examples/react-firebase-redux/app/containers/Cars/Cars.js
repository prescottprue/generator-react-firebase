import React, { Component, PropTypes } from 'react'

import './Cars.scss'
import { connect } from 'react-redux'
import { firebase, helpers } from 'redux-firebasev3'
const { isLoaded, isEmpty, pathToJS } = helpers

// Props decorators
@firebase([
  'cars'
])
@connect(
  ({firebase}) => ({
    cars: pathToJS(firebase, 'cars'),
    profile: pathToJS(firebase, 'profile')
  })
)
export default class Cars extends Component {
  static propTypes = {
    cars: PropTypes.array,
    addCar: PropTypes.func
  }

  handleClick = () => {
    console.log('add car clicked')
  }

  render () {
    const carsList = this.props.cars ? this.props.cars.map((car, i) =>
      (<li key={ i }>{ car.name } - { car.hp }</li>)
    ) : null
    return (
      <div className='Cars'>
        <h2>Cars</h2>
        <div className='ClassList'>
          <ul>
            { carsList }
          </ul>
          <button onClick={ this.handleClick.bind(this) }>Add tesla</button>
        </div>
      </div>
    )
  }
}
