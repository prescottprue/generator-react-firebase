export default theme => ({
  root: {
    ...theme.flexRowCenter,
    width: '100%',
    height: '100%'
  },
  pane: {
    ...theme.flexColumnCenter,
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
    ...theme.flexColumnCenter,
    flexBasis: '60%',
    marginBottom: '3rem',
    marginTop: '2rem'
  }
})
