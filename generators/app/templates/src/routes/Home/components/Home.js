import React, { Component } from 'react' // eslint-disable-line
import { map } from 'lodash'
import { Link } from 'react-router'
import logo from '../assets/devShareLogo.gif'
import preview from '../assets/devShareEdit.gif'

// Components
import RaisedButton from 'material-ui/RaisedButton'
import Theme from '../../../theme'
import GroupIcon from 'material-ui/svg-icons/social/group'
import CloudDownload from 'material-ui/svg-icons/file/cloud-download'
import StartIcon from 'material-ui/svg-icons/content/create'
import Paper from 'material-ui/Paper'

import classes from './Home.scss'

// Styling vars
const iconStyle = {
  width: '130px',
  height: '130px'
}
const buttonStyle = {
  margin: '3rem',
  height: '3rem',
  lineHeight: '3rem',
  marginBottom: 5
}
const buttonLabelStyle = {
  fontSize: '1.5rem'
}

export class Home extends Component {
  trackEvent = () => {
    // event({ category: 'Projects', action: 'Create Anonymous' })
  }

  render () {
    const meInThree = [
      {
        title: 'Work with others in real-time',
        icon: <GroupIcon style={iconStyle} />,
        desc: 'Share a link or add someone with an account directly to your project.'
      },
      {
        title: 'Start from anywhere',
        icon: <StartIcon style={iconStyle} />,
        desc: 'Upload an existing project or start from scratch.'
      },
      {
        title: 'Download your project',
        icon: <CloudDownload style={iconStyle} />,
        desc: 'Export all the files and folder into a zip file to continue development or deploy.'
      }
    ]

    const meInThreeElements = map(meInThree, (content, key) => {
      return (
        <div className={classes['features-item']} key={key} >
          {content.icon}
          <div className={classes['features-title']}>
            {content.title}
          </div>
          <div className={classes['features-desc']}>
            {content.desc}
          </div>
        </div>
      )
    })

    return (
      <div className={classes['container']} style={{ color: Theme.palette.primary2Color }}>
        <div>
          <div className={classes['hero']}>
            <div className={classes['logo']}>
              <img src={logo} alt='Devshare' />
              <span className={classes['brand']}>devShare</span>
            </div>
            <span className={classes['name']}>Build together</span>
            <span className={classes['description']}>
            real-time, full-project code editing in browser
            </span>
            <RaisedButton
              primary
              label='Share Code'
              style={buttonStyle}
              labelStyle={buttonLabelStyle}
              containerElement={<Link to={`/anon/${'asdfas'}`} />}
              onClick={this.trackEvent}
            />
            <span className={classes['muted']}>No sign up required</span>
            <div className={classes['preview']}>
              <Paper style={{marginBottom: -10}} zDepth={1}>
                <img className={classes['preview-img']} src={preview} />
              </Paper>
            </div>
          </div>
          <div className={classes['features']}>
          {meInThreeElements}
          </div>
          <div className={classes['footer']}>
            Made by <a target='_blank' href='http://kyper.io'>Kyper</a>
          </div>
        </div>
      </div>
    )
  }
}
export default Home
