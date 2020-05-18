import React from 'react';<% if (addStyle) { %>
import { makeStyles } from '@material-ui/core/styles';<% } %>
// import use<%= startCaseName %> from './<%= name %>';<% if (addStyle) { %>
import styles from './<%= name %>.styles';

const useStyles = makeStyles(styles);<% } %>

function <%= name %>() {
  const classes = useStyles();
  // const { } = use<%= startCaseName %>();

  return (
    <div className={classes.root}>
      <span><%= name %> Component</span>
    </div>
  );
}

export default <%= name %>;
