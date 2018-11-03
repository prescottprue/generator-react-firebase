const flexColumnCenter = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}
const flexRowCenter = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center'
}

export default theme => ({
  root: {
    ...flexRowCenter,
    width: '100%',
    height: '100%'
  },
  pane: {
    ...flexColumnCenter,
    justifyContent: 'space-around',
    flexBasis: '60%'
  },
  avatarCurrent: {
    width: '100%',
    maxWidth: '13rem',
    height: 'auto',
    cursor: 'pointer'
  },
  meta: {
    ...flexColumnCenter,
    flexBasis: '60%',
    marginBottom: '3rem',
    marginTop: '2rem'
  }
})
