<% if (includeRedux) { %>import { reduxForm } from 'redux-form'
import { NEW_PROJECT_FORM_NAME } from 'constants'<% } %>

export default <% if (includeRedux) { %>reduxForm({
  form: NEW_PROJECT_FORM_NAME,
  // Clear the form for future use (creating another project)
  onSubmitSuccess: (result, dispatch, props) => props.reset()
})<% } %>
