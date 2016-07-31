import React, { Component, PropTypes } from 'react'

import './Cars.scss'
<% if (!answers.includeRedux) { %>import firebase from '../../utils/firebase'<% } %><% if (answers.includeRedux) { %>import { connect } from 'react-redux'
import { firebase, helpers } from 'redux-firebasev3'
const { pathToJS } = helpers

// Props decorators
@firebase([
  'cars'
])
@connect(
  ({firebase}) => ({
    cars: pathToJS(firebase, 'cars'),
    profile: pathToJS(firebase, 'profile')
  })
)<% } %>
export default class Cars extends Component {
  static propTypes = {
    cars: PropTypes.array,
    addCar: PropTypes.func
  }

  handleClick = () => {
    console.log('add car clicked')
  }

  render () {
    const { cars } = this.props
    const carsList = cars ? cars.map((car, i) =>
      (<li key={ i }>{ car.name } - { car.hp }</li>)
    ) : null
    return (
      <div className='Cars'>
        <h2>Cars</h2>
        <div className='ClassList'>
          <ul>
            { carsList }
          </ul>
          <button onClick={ this.handleClick }>Add tesla</button>
        </div>
      </div>
    )
  }
}
