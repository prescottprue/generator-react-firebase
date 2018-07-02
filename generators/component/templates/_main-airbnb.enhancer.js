import { compose } from 'redux';
import { withHandlers } from 'recompose';<% if (styleType === 'localized') { %>
import { withStyles } from '@material-ui/core/styles';
import style from './<%= name %>.style';<% } %>

export default compose(
  withHandlers({
    // someHandler: props => value => {}
  }),<% if (styleType === 'localized') { %>
  withStyles(style)<% } %>
);
