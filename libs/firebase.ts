// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzIhPnZZnvyiAnHCNuGl6Y2pG7HbaFPa8",
  authDomain: "vtech-challenge-4223d.firebaseapp.com",
  projectId: "vtech-challenge-4223d",
  storageBucket: "vtech-challenge-4223d.appspot.com",
  messagingSenderId: "788271677469",
  appId: "1:788271677469:web:82351ae0849cc9840606f4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getFirestore(app);
