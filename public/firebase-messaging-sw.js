// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "YOURDATA",
  authDomain: "YOURDATA",
  projectId: "YOURDATA",
  storageBucket: "YOURDATA",
  messagingSenderId: "YOURDATA",
  appId: "YOURDATA",
  measurementId: "YOURDATA",
};

firebase.initializeApp(firebaseConfig);

// Initialize firebase messaging. Notifications are managed by the backend.
const messaging = firebase.messaging();
