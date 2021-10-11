import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

export const Root = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  height: '200px',
  width: '300px',
  margin: theme.spacing(0.5),
  padding: theme.spacing(1.3)
}));

export const TileContent = styled(Paper)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%'
}));

export const ProjectName = styled(Paper)(() => ({
  fontSize: '1.5rem',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'all 800ms cubic-bezier(0.25,0.1,0.25,1) 0ms',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  '&:hover': {
    color: ''
  },
  '&:visited': {
    textDecoration: 'none'
  }
}));