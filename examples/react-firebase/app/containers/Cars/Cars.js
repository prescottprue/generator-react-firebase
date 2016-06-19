import React, { Component, PropTypes } from 'react'


// something only firebase


import './Cars.scss'

export default class Cars extends Component {

  constructor (props) {
    super(props)
  }

  static propTypes = {
    cars: PropTypes.array,
    addCar: PropTypes.func
  }

  handleClick = () => {
    console.log('add car clicked')
  }

  render () {
    const carsList = this.props.cars.map((car, i) => {
      return <li key={ i }>{ car.name } - { car.hp }</li>
    })
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

