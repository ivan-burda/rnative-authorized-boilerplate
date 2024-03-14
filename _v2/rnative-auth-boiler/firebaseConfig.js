import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
export const firebaseConfig = {
    apiKey: "AIzaSyC8_pdlNlnq_Sj3CxhoG1PY7o2PifWMMMI",
    authDomain: "feelings-tracker-application.firebaseapp.com",
    databaseURL: "https://feelings-tracker-application-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "feelings-tracker-application",
    storageBucket: "feelings-tracker-application.appspot.com",
    messagingSenderId: "1016437152914",
    appId: "1:1016437152914:web:aac1c34697e1b038e19a4b",
    measurementId: "G-N70B1PFMBC"
};

export const app = initializeApp(firebaseConfig);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase