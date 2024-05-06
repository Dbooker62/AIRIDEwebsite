// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyD8TuL_uVTuvT5eLJ62mf8Tzh1Klx-Znqw",
    authDomain: "airide-66ced.firebaseapp.com",
    databaseURL: "https://airide-66ced-default-rtdb.firebaseio.com",
    projectId: "airide-66ced",
    storageBucket: "airide-66ced.appspot.com",
    messagingSenderId: "69402043146",
    appId: "1:69402043146:web:8f9380cfe7017e310f90f3",
    measurementId: "G-GVD0FKC328"
  });

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle =payload.notification.title;
    const notificationOptions = {
      body: payload.notification,
      icon: payload.notification.image
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });