// firebase.js

// Import the necessary functions from the Firebase SDK
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth' // Firebase Authentication
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from 'firebase/firestore' // Firebase Firestore, if needed

// Your Firebase web app's configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCvtpX3BeDOzhlisd0E6TYfGYKQ6afKjM0',
  authDomain: 'assignment03-d7a93.firebaseapp.com',
  projectId: 'assignment03-d7a93',
  storageBucket: 'assignment03-d7a93.appspot.com',
  messagingSenderId: '470569568430',
  appId: '1:470569568430:web:769c9bd5a14c30c6a5053f',
  measurementId: 'G-EXZ31LZSP2'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and export it
const auth = getAuth(app)
// const analytics = getAnalytics(app);
export { auth }
