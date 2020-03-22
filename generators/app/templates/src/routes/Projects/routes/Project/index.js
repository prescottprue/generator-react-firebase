import { loadable } from 'utils/router'

export default {
  path: ':projectId',<% if (!includeRedux) { %>
  authRequired: true,<% } %>
  component: loadable(() =>
    import(/* webpackChunkName: 'Project' */ './components/ProjectPage')
  )
}
