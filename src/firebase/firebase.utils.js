import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCkS31SO1v8_-oQoOEIZQfOJ40qIaXRxaA",
  authDomain: "crwn-db-2e49c.firebaseapp.com",
  projectId: "crwn-db-2e49c",
  storageBucket: "crwn-db-2e49c.appspot.com",
  messagingSenderId: "827012411935",
  appId: "1:827012411935:web:c5230a0e63a012cf501b2a",
  measurementId: "G-CVH0XWLYJ3",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
