export default (theme) => ({
  flex: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.background.default
        : theme.palette.primary1Color
  },
  signIn: {
    color: 'white',
    textDecoration: 'none',
    alignSelf: 'center'
  }
})
