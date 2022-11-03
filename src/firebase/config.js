import { getFirestore } from 'firebase/firestore'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDHUPFL_OodSsvjW6IftvoI37HKwxS5w3Q",
    authDomain: "counter-points-5c42a.firebaseapp.com",
    projectId: "counter-points-5c42a",
    storageBucket: "counter-points-5c42a.appspot.com",
    messagingSenderId: "323266072729",
    appId: "1:323266072729:web:bc8a783608515c97012808",
    measurementId: "G-HK0768VXWP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
export { db }