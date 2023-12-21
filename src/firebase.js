import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClPmUKGLoBM2wciFCPuVi5DnnCEk0_QIs",
  authDomain: "whatsapp-clone-project-e4341.firebaseapp.com",
  projectId: "whatsapp-clone-project-e4341",
  storageBucket: "whatsapp-clone-project-e4341.appspot.com",
  messagingSenderId: "366996906019",
  appId: "1:366996906019:web:47737cb6166b9136e05196",
  measurementId: "G-VELT45KV59",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider(); // For Google Authentication

export { auth, provider };
export default db;
