"use client";

import Script from 'next/script'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getMessaging, getToken } from "firebase/messaging";
import { getDatabase, ref, set } from "firebase/database";

export default function Header() {

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

  async function RequestNotification() {
    // For all devices including ios.
    // Listen to button and add event listeners to request notification permissions.
    // Notification.requestPermission();

    // For android and web.
    // Ask notification by default.
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Permission granted.');
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
  };

  function pushTokenToServer(token: string, ttl: number) {
    const db = getDatabase();
    set(ref(db, 'tokens/' + token), {
      ttl: ttl,
      date: new Date()
    });
  }

  return (
    <div>
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/icon-512x512.png"></link>
      <div className="container">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-S2DHEHCCVL"></Script>
        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-S2DHEHCCVL');
          `}
        </Script>
      </div>

      <header className="bg-white shadow">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-gray-800 font-bold text-xl"><a href="https://briefings.dev">Briefings.dev</a></h1>
          <nav className="text-gray-600 text-sm">
            {/* <a href="https://briefings.dev" className="py-2 px-4 hover:opacity-0 transition-opacity duration-500 sm:inline-block hidden">Home</a>
            <a href="https://briefings.dev" className="py-2 px-4 hover:opacity-0 transition-opacity duration-500 sm:inline-block hidden" >About</a> */}
            <button onClick={RequestNotification} id="push" className="py-2 px-4">Push</button>
          </nav>
        </div>
      </header>
    </div>
  )
}