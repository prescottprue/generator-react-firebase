export default (theme) => ({
  root: {
    padding: theme.spacing(4),
    flexGrow: '2',
    boxSizing: 'border-box',
    overflowY: 'scroll'
  },
  tiles: {
    display: 'flex',
    ...theme.flexColumnCenter,
    justifyContent: 'center',
    flexWrap: 'wrap',
    '-webkit-flex-flow': 'row wrap'
  },
  empty: {
    padding: theme.spacing(4)
  }
})
