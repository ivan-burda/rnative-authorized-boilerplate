// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyC8_pdlNlnq_Sj3CxhoG1PY7o2PifWMMMI",
    authDomain: "feelings-tracker-application.firebaseapp.com",
    projectId: "feelings-tracker-application",
    storageBucket: "feelings-tracker-application.appspot.com",
    messagingSenderId: "1016437152914",
    appId: "1:1016437152914:web:aac1c34697e1b038e19a4b",
    measurementId: "G-N70B1PFMBC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);