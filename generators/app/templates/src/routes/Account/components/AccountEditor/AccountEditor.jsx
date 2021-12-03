import React from 'react'<% if (!includeRedux && includeFirestore) { %>
import { doc } from 'firebase/firestore'
import { useFirestore, useFirestoreDocData, useUser } from 'reactfire'<% } %><% if (!includeRedux && !includeFirestore) { %>
import { ref } from 'firebase/database'
import { useDatabase, useDatabaseObjectData, useUser } from 'reactfire'<% } %>
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'<% if (includeRedux) { %>
import { useSelector } from 'react-redux'
import { isLoaded, useFirebase } from 'react-redux-firebase'
import LoadingSpinner from 'components/LoadingSpinner'<% } %>
import { useNotifications } from 'modules/notification'<% if (!includeRedux) { %>
import { USERS_COLLECTION } from 'constants/firebasePaths'<% } %>
import defaultUserImageUrl from 'static/User.png'
import AccountForm from '../AccountForm'

export const GridItem = styled(Grid)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(5)
}));

export const CurrentAvatar = styled('img')(() => ({
  width: '100%',
  maxWidth: '13rem',
  marginTop: '3rem',
  height: 'auto',
  cursor: 'pointer'
}));


function AccountEditor() {
  const { showSuccess, showError } = useNotifications()<% if (!includeRedux && includeFirestore) { %>
  const firestore = useFirestore()
  const { data: auth } = useUser()
  const accountRef = doc(firestore, USERS_COLLECTION, auth.uid)
  const { data: profile } = useFirestoreDocData(accountRef)<% } %><% if (!includeRedux && !includeFirestore) { %>
  const database = useDatabase()
  const { data: auth } = useUser()
  const accountRef = ref(database, `${USERS_COLLECTION}/${auth.uid}`)
  const { data: profile } = useDatabaseObjectData(accountRef)<% } %><% if (includeRedux) { %>
  const firebase = useFirebase()

  // Get profile from redux state
  const profile = useSelector(({ firebase }) => firebase.profile)

  if (!isLoaded(profile)) {
    return <LoadingSpinner />
  }<% } %>

  async function updateAccount(newAccount) {
    try {
      await <% if (includeRedux) { %>firebase.updateProfile(newAccount)<% } %><% if (!includeRedux) { %>auth.updateProfile(newAccount)
      await accountRef.set(newAccount, { merge: true })<% } %>
      showSuccess('Profile updated successfully')
    } catch (err) {
      console.error('Error updating profile', err) // eslint-disable-line no-console
      showError(`Error updating profile: ${err.message}`)
    }
  }

  return (
    <Grid container spacing={2} justifyContent="center">
      <GridItem item xs={12} md={6} lg={6}>
        <CurrentAvatar
          src={profile?.avatarUrl || defaultUserImageUrl}
          alt=""
        />
      </GridItem>
      <Grid item xs={12} md={6} lg={6}>
        <AccountForm onSubmit={updateAccount} account={profile} />
      </Grid>
    </Grid>
  )
}

export default AccountEditor
