/* eslint-disable no-console, no-restricted-globals */
/* global firebase importScripts */
// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('https://www.gstatic.com/firebasejs/7.2.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.2.0/firebase-messaging.js')

const PROD_MESSAGING_ID = '<%= messagingSenderId %>'
const STAGE_MESSAGING_ID = '' // TODO: Set your staging messaging ID here
/* eslint-disable prettier/prettier */
firebase.initializeApp({
  // Use prod id if stage id not defined or running on prod Firebase hosting
  messagingSenderId: !STAGE_MESSAGING_ID || self.location.hostname.includes('<%= firebaseName %>')
    ? PROD_MESSAGING_ID
    : STAGE_MESSAGING_ID
})
/* eslint-disable prettier/prettier */

const messaging = firebase.messaging()

// Custom background message handler
messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  )
  
  // Customize default notification here
  const notificationTitle = '<%= capitalAppName %>'
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  }

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
})
