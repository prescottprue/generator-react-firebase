const flexColumnCenter = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

export default theme => ({
  root: {
    ...flexColumnCenter,
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%'
  },
  fields: {
    width: '60%'
  }
})
