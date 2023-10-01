// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA09lR8ZRAHC1vjL5wtpC_wiBdY7PCnNSg",
  authDomain: "m9m50-user-email-passwor-35cf9.firebaseapp.com",
  projectId: "m9m50-user-email-passwor-35cf9",
  storageBucket: "m9m50-user-email-passwor-35cf9.appspot.com",
  messagingSenderId: "218531930265",
  appId: "1:218531930265:web:e4455574c1824933e01808"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;