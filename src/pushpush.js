"use client";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getMessaging, getToken } from "firebase/messaging";
import { getDatabase, ref, set } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// TODO Initialize Firebase Analytics.
// const analytics = getAnalytics(app);

async function requestPermission() {
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            // Get registration token. Initially this makes a network call, once retrieved
            // subsequent calls to getToken will return from cache.
            const messaging = getMessaging();
            
            getToken(messaging, { 
                vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
            }).then((currentToken) => {
                if (currentToken) {
                    // Log token and send to server.
                    // TODO: Set IP and ttl.
                    pushTokenToServer(currentToken, 3600);
                } else {
                    // Show permission request UI
                    console.log('No registration token available. Request permission to generate one.');
                    // ...
                }
            }).catch((err) => {
                console.log('An error occurred while retrieving token. ', err);
                // ...
            });
        } else {
            console.log('Unable to get permission.');
        }
    });
}

function pushTokenToServer(token, ttl) {
    const db = getDatabase();
    set(ref(db, 'tokens/' + token), {
        token: token,
        ttl : ttl,
        date: new Date()
    });
}

requestPermission();