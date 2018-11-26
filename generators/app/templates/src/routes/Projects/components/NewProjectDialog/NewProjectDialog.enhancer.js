import { compose } from 'recompose';
<% if (includeRedux) { %>import { reduxForm } from 'redux-form'
import { NEW_PROJECT_FORM_NAME } from 'constants/formNames'<% } %>
import { withStyles } from '@material-ui/core/styles'
import styles from './NewProjectDialog.styles'

export default compose(
  <% if (includeRedux) { %>reduxForm({
    form: NEW_PROJECT_FORM_NAME,
    // Clear the form for future use (creating another project)
    onSubmitSuccess: (result, dispatch, props) => props.reset()
  }),<% } %>
  withStyles(styles)
)
