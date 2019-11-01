import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './<%= name %>.styles'

const useStyles = makeStyles(styles);

function <%= name %>({ <%= camelName %> }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span><%= name %> Component</span><% if (includeEnhancer) { %>
      <pre>{JSON.stringify(<%= camelName %>, null, 2)}</pre><% } %>
    </div>
  );
}

export default <%= name %>;
