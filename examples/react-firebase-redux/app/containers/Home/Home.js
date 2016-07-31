import React, { Component } from 'react'
import { Link } from 'react-router'

import './Home.scss'

export default class Home extends Component {
  render () {
    return (
      <div className='Home'>
        <h2>Welcome to react-firebase-redux</h2>
        <p>Example application built React and Firebase. </p>
        <Link to="/cars">Cars List Example</Link>
      </div>
    )
  }
}
