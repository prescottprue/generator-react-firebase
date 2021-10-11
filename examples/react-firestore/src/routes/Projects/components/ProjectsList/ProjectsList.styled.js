import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles';

export const Root = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  flexGrow: '2',
  boxSizing: 'border-box',
  overflowY: 'scroll'
}));

export const Tiles = styled('div')(({ theme }) => ({
  ...theme.flexColumnCenter,
  justifyContent: 'center',
  flexWrap: 'wrap',
  'WebkitFlexFlow': 'row wrap'
}));

export const EmptyMessage = styled(Paper)(() => ({
  padding: theme.spacing(4)
}));