import React, { Component, PropTypes } from 'react'
<% if (answers.includeRedux) { %>
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/cars'
<% } %>
<% if (!answers.includeRedux) { %>
// something only firebase
<% } %>

import './Cars.scss'
<% if (answers.includeRedux) { %>class Cars extends Component <% } %>
<% if (!answers.includeRedux) { %>export default class Cars extends Component {<% } %>

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
<% if (answers.includeRedux) { %>
// Place state of redux store into props of component
const mapStateToProps = (state) => {
  return {
    cars: state.cars,
    router: state.router
  }
}

// Place action methods into props
const mapDispatchToProps = (dispatch) => bindActionCreators(Actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Cars)
<% } %>
