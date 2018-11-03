const flexColumnCenter = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

export default theme => ({
  root: {
    ...flexColumnCenter,
    justifyContent: 'flex-start',
    flexGrow: 1,
    height: '100%',
    width: '100%',
    margin: '.2rem'
  },
  submit: {
    ...flexColumnCenter,
    justifyContent: 'center',
    flexGrow: 1,
    textAlign: 'center',
    padding: '1.25rem',
    minWidth: '192px',
    marginTop: '1.5rem'
  }
})
