export default (theme) => ({
  appBar: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.background.default
        : theme.palette.primary1Color
  },
  signIn: {
    color: 'white',
    textDecoration: 'none',
    alignSelf: 'center'
  }
})
