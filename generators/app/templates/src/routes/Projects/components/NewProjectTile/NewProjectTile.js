import React, {Component, PropTypes} from 'react'
import Paper from 'material-ui/Paper'
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'

import classes from './NewProjectTile.scss'

const iconSize = '6rem'
const iconStyle = { width: iconSize, height: iconSize }
const color = '#979797'
const hoverColor = '#616161'

export default class NewProjectTile extends Component {

  static propTypes = {
    onClick: PropTypes.func
  }

  render () {
    return (
      <Paper className={classes['container']} onClick={this.props.onClick}>
        <ContentAddCircle
          color={color}
          hoverColor={hoverColor}
          style={iconStyle}
        />
      </Paper>
    )
  }
}
