"use client";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getMessaging, getToken } from "firebase/messaging";
import { getDatabase, ref, set, get } from "firebase/database";
import React from 'react';

export default function SubscribeButton() {

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

  // Tracks subscription status.
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  // Initialize Firebase, then get a token.
  const app = initializeApp(firebaseConfig);
  let tokenRef = React.useRef("");
  React.useEffect(() => {
    getToken(getMessaging(), {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
    }).then((currentToken) => {
      if (!currentToken || currentToken === '') { return; }
      tokenRef.current = currentToken;
      // check if it's in server.
      const db = getDatabase();
      get(ref(db, 'tokens/' + currentToken)).then((tokens) => {
        if (tokens.exists()) {
          setIsSubscribed(true);
        } else {
          setIsSubscribed(false);
        }
      });
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
  }, []);
  const currentToken = tokenRef.current;

  async function requestNotification() {
    // For all devices including ios.
    // Listen to button and add event listeners to request notification permissions.
    // Notification.requestPermission();

    // For android and web.
    // Ask notification by default.
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        if (currentToken !== "") {
          const db = getDatabase();
          set(ref(db, 'tokens/' + currentToken), {
            ttl: 3600,
            date: new Date()
          });
          setIsSubscribed(true);
          // Log token and send to server.
          // TODO: Set IP and ttl.
          console.log('Successfully retrieved token. Sending to server.');
        } else {
          // Show permission request UI
          console.log('Failed to subscribe: no registration token available.');
          // ...
        }
      } else {
        console.log('Failed to subscribe: U=unable to get permission.');
      }
    });
    handleButtonClick();
  };

  async function removeTokenFromServer() {
    if (currentToken !== "") {
      setIsSubscribed(false);
      const db = getDatabase();
      set(ref(db, 'tokens/' + currentToken), null);
      console.log('Successfully unsubscribed from server.');
    } else {
      console.log('Failed to unsubscribe: no registration token available.');
    }
    handleButtonClick();
  };

  // Controls drop down menu logic.
  const [isButtonClicked, setIsButtonClicked] = React.useState(false);
  const handleButtonClick = () => {
    setIsButtonClicked(!isButtonClicked);
  };

  return (
    <div className="flex-grow">
      <div className="items-center justify-end basis-0 md:flex flex">
        {/* <a href="https://briefings.dev" className="py-2 px-4 hover:opacity-0 transition-opacity duration-500 sm:inline-block hidden">Home</a>
              <a href="https://briefings.dev" className="py-2 px-4 hover:opacity-0 transition-opacity duration-500 sm:inline-block hidden" >About</a> */}
        <div className="px-4 py-2 text-sm font-semibold rounded bg-slate-900 text-slate-50 transition ease-in-out delay-75">
          <button type="button" className="" id="menu-button" aria-expanded="false" aria-haspopup={isButtonClicked ? false : true} onClick={handleButtonClick}>
            Subscribe Status: {isSubscribed ? 'YES' : 'NO'}
          </button>
        </div>
      </div>

      <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" style={{ display: isButtonClicked ? 'block' : 'none' }}>
        <div className="py-1" role="none">
          <button type="submit" className="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" id="menu-subscribe" onClick={requestNotification}>Subscribe</button>
          <button type="submit" className="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" id="menu-unsubscribe" onClick={removeTokenFromServer}>Unsubscribe</button>
        </div>
      </div>
    </div>
  )
}