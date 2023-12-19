import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBu_j8oHB1ECaP7UbkGoWKNEnwRrnCpo6c",
  authDomain: "whatsapp-clone-project-ef373.firebaseapp.com",
  projectId: "whatsapp-clone-project-ef373",
  storageBucket: "whatsapp-clone-project-ef373.appspot.com",
  messagingSenderId: "303042909270",
  appId: "1:303042909270:web:6f4f756202f4c11536d7f7",
  measurementId: "G-BDPQEPL758",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider(); // For Google Authentication

export { auth, provider };
export default db;
